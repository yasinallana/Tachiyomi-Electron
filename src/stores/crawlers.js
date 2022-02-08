import { moveBetweenTwoArrays } from 'src/helpers/moveBetweenArrays';
import { writable } from 'svelte/store';

const baseStruct = {
  active: [],
  inactive: [],
};

function createCrawlersStore() {
  const { subscribe, set, update } = writable(baseStruct);

  return {
    subscribe,
    init: (crawlers, type) => {
      update((state) => {
        if (type == 'active') {
          return {
            ...state,
            active: crawlers,
          };
        } else if (type == 'inactive') {
          return {
            ...state,
            inactive: crawlers,
          };
        }

        return state;
      });
    },
    activate: (/** @type {number} */ crawlerIndex) => {
      update((state) => {
        const { fromArray, toArray } = moveBetweenTwoArrays(state.inactive, state.active, crawlerIndex);

        return {
          active: toArray,
          inactive: fromArray,
        };
      });
    },
    deactivate: (/** @type {number} */ crawlerIndex) => {
      update((state) => {
        const { fromArray, toArray } = moveBetweenTwoArrays(state.active, state.inactive, crawlerIndex);

        return {
          active: fromArray,
          inactive: toArray,
        };
      });
    },

    flush: () => set(baseStruct),
  };
}

export const crawlersStore = createCrawlersStore();
