const getActiveCrawlers = require('./ipc-processing/get-active-crawlers');
const getAvailableCrawlers = require('./ipc-processing/get-available-crawlers');
const changeCrawlerStatus = require('./ipc-processing/change-crawler-status');
const executeCrawler = require('./ipc-processing/execute-crawler');

// Globals
let mainWindow;

function processIpcEvent(_mainWindow, args) {
  mainWindow = _mainWindow;
  const { eventId } = args;

  switch (eventId) {
    case 'getActiveCrawlers':
      getActiveCrawlers.activeCrawlers(mainWindow);
      break;

    case 'getAvailableCrawlers':
      getAvailableCrawlers.availableCrawlers(mainWindow);
      break;

    case 'changeCrawlerStatus':
      changeCrawlerStatus.changeCrawlerStatus(mainWindow, args);
      break;

    case 'executeCrawler':
      executeCrawler.executeCrawler(mainWindow, args);
      break;

    default:
      throw console.error('Unknown IPC event');
  }
}

module.exports = { processIpcEvent };
