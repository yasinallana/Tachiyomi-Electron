const { error } = require('console');
const fs = require('node:fs/promises');
const path = require('node:path');
const sandbox = require('../sandbox/sandbox');
const axios = require('axios').default;

const electronConstants = require('../electron-constants');

function processFileContent(data) {
  let filemeta = sandbox.executeCodeInSandbox(data);
  let mainFunction = filemeta?.main;

  if (typeof mainFunction == 'function') {
    let runner = mainFunction.toString();
    let fn = `${runner} ;main()`;

    let mainFunctionResults = sandbox.executeCodeInSandbox(fn);
    console.log(mainFunctionResults);
  }
  return null;
}

// Get Crawlers init
async function executeCrawler(mainWindow, args) {
  const { file } = args;

  let completeFilePath = path.join(electronConstants.crawlerStoragePath, file);

  try {
    let readerStream = await fs.readFile(completeFilePath, {
      encoding: 'utf-8',
    });

    let processed = processFileContent(readerStream);
  } catch (e) {
    throw error(e);
  }
}

module.exports = { executeCrawler };
