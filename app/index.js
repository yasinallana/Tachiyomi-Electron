const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.IS_DEV === 'true';

if (require('electron-squirrel-startup')) {
  app.quit();
}

let loadingScreen;

// Loading screen
const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow({
    width: 200,
    height: 400,
    frame: false,
    transparent: true,
    resizable: false,
  });

  loadingScreen.loadFile(path.join(__dirname, 'loader', 'index.html'));
  // loadingScreen.loadURL(`file://${__dirname}/build/loader/index.html`);
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.maximize();
  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

function initLoaderAndMainProcess() {
  createLoadingScreen();
  setTimeout(() => {
    createWindow();
  }, 20000);
}

app.whenReady().then(() => {
  initLoaderAndMainProcess();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      initLoaderAndMainProcess();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
