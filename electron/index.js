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
    height: 200,
    frame: false,
    transparent: true,
    resizable: false,
    icon: `${__dirname}/svelte-dist/electron_icon.png`,
  });

  loadingScreen.loadFile(`${__dirname}/loader/index.html`);
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
};

// Main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
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

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

// Launch loader and main window
function initLoaderAndMainProcess() {
  createLoadingScreen();
  createWindow();
}

app.whenReady().then(() => {
  initLoaderAndMainProcess();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      initLoaderAndMainProcess();
    }
  });
});

// Handle closure
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
