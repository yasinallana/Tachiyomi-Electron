const { error, log } = require('console');
const fs = require('node:fs/promises');
const path = require('node:path');
const sandbox = require('../sandbox/sandbox');
const axios = require('axios').default;

const electronConstants = require('../electron-constants');

async function processFileContent(filePath, functionToRun, additionalArgs) {
  const { sandboxResults } = sandbox.executeFileInSandBox(filePath);

  const functionsList = sandboxResults.functions ?? null;

  if (functionsList != null) {
    if (functionsList.hasOwnProperty(functionToRun) && functionToRun != null) {
      const functionSelected = functionsList[functionToRun];

      if (typeof functionSelected == 'function') {
        const selectedFunctionName = functionSelected.name;
        const functionSelfCallString = `
          ${functionSelected};
          (function() {
            return ${selectedFunctionName}(${additionalArgs})
          })()
          `;
        let { sandboxResults } = await sandbox.executeCodeInSandbox(functionSelfCallString, {
          axios,
        });

        console.log(sandboxResults);
      }
      //
      else {
        throw error(`Not a function`);
      }
    }
    //
    else if (functionToRun == null) {
      throw error(`Function to be invoked is required`);
    }
    //
    else if (!Object.hasOwnProperty(functionToRun)) {
      throw error(`Crawler does not possess a function called "${functionToRun}"`);
    }
  } else {
    throw error('Crawler does not possess a "functions" object');
  }

  return null;
}

// Get Crawlers init
async function executeCrawler(mainWindow, args) {
  const { file, functionToRun, additionalArgs } = args;

  let completeFilePath = path.join(electronConstants.crawlerStoragePath, file);
  processFileContent(completeFilePath, functionToRun, additionalArgs);

  // try {
  //   let readerStream = await fs.readFile(completeFilePath, {
  //     encoding: 'utf-8',
  //   });

  //   let processed = await processFileContent(readerStream);
  // } catch (e) {
  //   throw error(e);
  // }
}

module.exports = { executeCrawler };
