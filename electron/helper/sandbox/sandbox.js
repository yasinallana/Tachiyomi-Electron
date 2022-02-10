const vm = require('vm');

const executeCodeInSandbox = (codeToBeRun, ctx = {}) => {
  try {
    vm.createContext(ctx);
    vm.runInContext(codeToBeRun, ctx);

    return ctx;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { executeCodeInSandbox };
