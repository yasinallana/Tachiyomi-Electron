const fs = require('fs');
const path = require('path');

// Custom helpers
const commonHelpers = require('./common');
const electronConstants = require('./electron-constants');

// Globals
let mainWindow;

// Execute Code

/**
 * Validate files
 * @param {string} data
 */
function processFileContent(data) {
  let evaluated = eval(data);
  let { meta, runnerFunction } = evaluated;

  let schema = { name: 'string', description: 'string', version: 'string' };
  let isValidMeta = commonHelpers.validateObjectKeysPresence(meta, schema);
  let isValidRunner = runnerFunction instanceof Function;

  if (isValidMeta && isValidRunner) {
    console.log({ isValidMeta, isValidRunner });
  }
}

/**
 * Process files
 * @param {String[]} files
 */
function processFilesList(files) {
  files.forEach(function (file) {
    var data = '';
    var readerStream = fs.createReadStream(path.join(electronConstants.crawlerStoragePath, file));
    readerStream.setEncoding('utf-8');

    // Handle stream events --> data, end, and error
    readerStream.on('data', function (chunk) {
      data += chunk;
    });

    readerStream.on('end', function () {
      processFileContent(data);
    });

    readerStream.on('error', function (err) {
      console.log(err.stack);
    });
  });
}
// Get Crawlers init
function getCrawlers() {
  let result = fs.readdir(electronConstants.crawlerStoragePath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    processFilesList(files);
  });

  mainWindow.webContents.send('fromMain', 'responseObj');
}

function processIpcEvent(_mainWindow, args) {
  mainWindow = _mainWindow;
  const { eventId } = args;

  switch (eventId) {
    case 'getCrawlers':
      getCrawlers();
      break;

    default:
      throw console.error('Unknown IPC event');
  }
}

module.exports = { processIpcEvent };
