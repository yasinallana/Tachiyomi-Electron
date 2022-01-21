const { error } = require('console');
const fs = require('node:fs/promises');
const path = require('node:path');

const electronConstants = require('../electron-constants');

async function processFilesList(file, activateDeactivate) {
  if (activateDeactivate === 'activate') {
    let src = path.join(electronConstants.electronRoot, 'crawlers', file);
    let dest = path.join(electronConstants.crawlerStoragePath, file);

    await fs.copyFile(src, dest);
  } else if (activateDeactivate === 'deactivate') {
    let filePath = path.join(electronConstants.crawlerStoragePath, file);

    await fs.unlink(filePath);
  }
}

// Get Crawlers init
async function changeCrawlerStatus(mainWindow, args) {
  const { file, fileIndex, newStatus } = args;

  if (newStatus) {
    await processFilesList(file, 'activate');
  } else {
    await processFilesList(file, 'deactivate');
  }

  mainWindow.webContents.send('receiveIpcEvent', { eventId: 'setActivationStatus', file, fileIndex, newStatus });
}

module.exports = { changeCrawlerStatus };
