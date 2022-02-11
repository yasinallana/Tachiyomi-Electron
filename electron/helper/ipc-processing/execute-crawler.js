const { error, log } = require('console');
const fs = require('node:fs/promises');
const path = require('node:path');
const sandbox = require('../sandbox/sandbox');
const axios = require('axios').default;

const electronConstants = require('../electron-constants');

async function processFileContent(data) {
  let { sandboxResults } = await sandbox.executeCodeInSandbox(data);

  let entryPoint = sandboxResults?.entryPoint;

  if (typeof entryPoint == 'function') {
    const entryPointFunction = entryPoint;
    const entryPointFunctionName = entryPointFunction.name;

    const functionSelfCallString = `
    ${entryPointFunction};
    (function() {
      ${entryPointFunctionName}()
    })()
    `;

    let { sandboxResults } = await sandbox.executeCodeInSandbox(functionSelfCallString, {
      axios,
    });
  }
  return null;
}

// Get Crawlers init
async function executeCrawler(mainWindow, args) {
  const { file } = args;

  let completeFilePath = path.join(electronConstants.crawlerStoragePath, 'mangafox.js');

  try {
    let readerStream = await fs.readFile(completeFilePath, {
      encoding: 'utf-8',
    });

    let processed = await processFileContent(readerStream);
  } catch (e) {
    throw error(e);
  }
}

module.exports = { executeCrawler };
