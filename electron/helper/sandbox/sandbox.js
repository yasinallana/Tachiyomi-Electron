const { VM } = require('vm2');

const executeFileInSandBox = (filePath, ctx = {}) => {
  const passedContext = {
    ...ctx,
    console,
  };

  const vm = new VM({
    sandbox: passedContext,
    eval: false,
    wasm: false,
  });

  let sandboxResults = vm.runFile(filePath);

  return {
    passedContext,
    sandboxResults,
  };
};

const executeCodeInSandbox = async (code, ctx = {}) => {
  const passedContext = {
    ...ctx,
    console,
  };

  const vm = new VM({
    sandbox: passedContext,
    eval: false,
    wasm: false,
    allowAsync: true,
  });

  let sandboxResults = await vm.run(code);

  return {
    passedContext,
    sandboxResults,
  };
};

module.exports = { executeFileInSandBox, executeCodeInSandbox };
