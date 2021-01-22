const electron = require("electron");
const Realm = require("realm");

const { app, BrowserWindow } = electron;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);