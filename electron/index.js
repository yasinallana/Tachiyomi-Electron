const { app, BrowserWindow, ipcMain, session } = require('electron');
const fs = require('fs');
const path = require('path');

/// Custom helpers
const ipcProcessor = require('./helper/ipc-processor');
const electronConstants = require('./helper/electron-constants');

// Env Mode
const isDev = process.env.IS_DEV === 'true';

if (require('electron-squirrel-startup')) {
  app.quit();
}

// Globals
let loadingScreen;
let mainWindow;

// Loading screen
const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow({
    webPreferences: {
      disableBlinkFeatures: 'Auxclick',
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
    width: 200,
    height: 200,
    frame: false,
    transparent: true,
    resizable: false,
    icon: `${__dirname}/svelte-dist/electron_icon.png`,
  });

  loadingScreen.loadFile(`${__dirname}/loader/index.html`);
  loadingScreen.webContents.on('will-navigate', (event, newURL) => {
    event.preventDefault();
  });

  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
};

// Main window
function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      disableBlinkFeatures: 'Auxclick',
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 1280,
    height: 720,
    icon: `${__dirname}/svelte-dist/electron_icon.png`,
  });

  mainWindow.maximize();
  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });

  // prevent navigation via middle mouse
  mainWindow.webContents.on('will-navigate', (event, newURL) => {
    event.preventDefault();
  });

  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    return callback(false);
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.removeMenu();
    mainWindow.loadFile(`${__dirname}/svelte-dist/index.html`);
  }
}

// Launch loader and main window
function initLoaderAndMainProcess() {
  createLoadingScreen();
  createWindow();
}

// App is ready
app.whenReady().then(() => {
  crawlerScriptStorage();
  initLoaderAndMainProcess();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; base-uri 'self';form-action 'self'",
        ],
      },
    });
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      initLoaderAndMainProcess();
    }
  });
});

// Access user documents to store crawler scripts
function crawlerScriptStorage() {
  let crawlerStoragePath = electronConstants.crawlerStoragePath;

  if (!fs.existsSync(crawlerStoragePath)) {
    fs.mkdirSync(crawlerStoragePath, { recursive: true });
  }
}

// IPC
ipcMain.on('sendIpcEvent', (event, args) => {
  ipcProcessor.processIpcEvent(mainWindow, args);
});

// Handle closure
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
