const path = require('path');
const { app } = require('electron');

const appScriptsStorage = app.getPath('documents');
const crawlerStoragePath = path.join(appScriptsStorage, 'tachiyomi/crawler-scripts');

module.exports = { appScriptsStorage, crawlerStoragePath };
