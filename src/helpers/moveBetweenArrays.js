const def = function (/** @type {{ name: string; }} */ a, /** @type {{ name: any; }} */ b) {
  return a.name.localeCompare(b.name);
};

export const moveBetweenTwoArrays = (
  /** @type {Array} */ fromArray,
  /** @type {Array} */ toArray,
  /** @type {number} */ elementIndex,
  sortingFunction = def
) => {
  let arrayA = fromArray;
  let arrayB = toArray;

  let arrayAItem = arrayA[elementIndex];
  arrayA = arrayA.filter((_, i) => i != elementIndex);

  arrayB = [...arrayB, arrayAItem];

  arrayB = arrayB.sort(sortingFunction);

  return { fromArray: arrayA, toArray: arrayB };
};
