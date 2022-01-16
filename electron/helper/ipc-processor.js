const getActiveCrawlers = require('./ipc-processing/get-active-crawlers');

// Globals
let mainWindow;

function processIpcEvent(_mainWindow, args) {
  mainWindow = _mainWindow;
  const { eventId } = args;

  switch (eventId) {
    case 'getActiveCrawlers':
      getActiveCrawlers.activeCrawlers(mainWindow);
      break;

    case 'availableCrawlers':
      break;

    default:
      throw console.error('Unknown IPC event');
  }
}

module.exports = { processIpcEvent };
