const path = require('path');
const rootPath = require('../../rootpath');
const { app } = require('electron');

const electronRoot = path.join(rootPath(), 'electron');
const appScriptsStorage = app.getPath('documents');
const crawlerStoragePath = path.join(appScriptsStorage, 'tachiyomi/crawler-scripts');

module.exports = { electronRoot, appScriptsStorage, crawlerStoragePath };
