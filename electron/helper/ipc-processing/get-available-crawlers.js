const { error } = require('console');
const fs = require('node:fs/promises');
const path = require('node:path');

const objectValidator = require('../common-func/object-validator');
const electronConstants = require('../electron-constants');

/**
 * Validate files
 * @param {string} data
 */
function processFileContent(data) {
  let evaluated = eval(data);
  let { meta, runnerFunction } = evaluated;

  let schema = { name: 'string', description: 'string', version: 'string', icon: 'string' };
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
  let processedFiles = await Promise.all(
    files.map(async (file) => {
      let completeFilePath = path.join(electronConstants.electronRoot, 'crawlers', file);

      try {
        let readerStream = await fs.readFile(completeFilePath, {
          encoding: 'utf-8',
        });

        let processed = processFileContent(readerStream);
        if (processed != null) {
          return { file, ...processed };
        }
      } catch (e) {
        throw error(e);
      }
    })
  );

  processedFiles = processedFiles.filter((file) => file != null && file != undefined);

  return processedFiles;
}

// Get Crawlers init
async function getAvailableCrawlers(mainWindow) {
  const availableCrawlersStoragePath = path.join(electronConstants.electronRoot, 'crawlers');
  try {
    let files = await fs.readdir(availableCrawlersStoragePath);
    let availableCrawlers = await processFilesList(files);
    mainWindow.webContents.send('receiveIpcEvent', { eventId: 'setAvailableCrawlers', availableCrawlers });
  } catch (e) {
    throw error('Unable to scan directory: ' + e);
  }
}

module.exports = { availableCrawlers: getAvailableCrawlers };
