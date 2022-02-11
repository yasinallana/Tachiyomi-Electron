const vm = require('vm');

const executeCodeInSandbox = async (codeToBeRun, ctx = {}) => {
  const passedContext = {
    ...ctx,
    console,
  };

  let asyncRunner = await new Promise((resolve, reject) => {
    vm.runInContext(
      codeToBeRun,
      vm.createContext({
        ...passedContext,
        returnResponse: resolve,
        returnError: reject,
      })
    );
  });

  return {
    passedContext,
    sandboxResults: asyncRunner,
  };
};

module.exports = { executeCodeInSandbox };
