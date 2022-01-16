const { error } = require('console');
const fs = require('fs').promises;
const path = require('path');

const objectValidator = require('../common-func/object-validator');
const electronConstants = require('../electron-constants');

/**
 * Validate files
 * @param {string} data
 */
function processFileContent(data) {
  let evaluated = eval(data);
  let { meta, runnerFunction } = evaluated;

  let schema = { name: 'string', description: 'string', version: 'string' };
  let isValidMeta = objectValidator.validateObjectKeysPresence(meta, schema);
  let isValidRunner = runnerFunction instanceof Function;

  if (isValidMeta && isValidRunner) {
    return meta;
  }

  return null;
}

/**
 * Process files
 * @param {String[]} files
 */
async function processFilesList(files) {
  return await Promise.all(
    files.map(async (file) => {
      let completeFilePath = path.join(electronConstants.crawlerStoragePath, file);

      try {
        let readerStream = await fs.readFile(completeFilePath, {
          encoding: 'utf-8',
        });

        let processed = processFileContent(readerStream);
        if (processed != null) {
          return processed;
        }
      } catch (error) {
        throw error(error);
      }
    })
  );
}
// Get Crawlers init
async function getActiveCrawlers(mainWindow) {
  try {
    let files = await fs.readdir(electronConstants.crawlerStoragePath);
    let activeCrawlers = await processFilesList(files);
    mainWindow.webContents.send('fromMain', activeCrawlers);
  } catch (error) {
    throw error('Unable to scan directory: ' + error);
  }
}

module.exports = { activeCrawlers: getActiveCrawlers };
