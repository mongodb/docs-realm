const { app, BrowserWindow, ipcMain } = require("electron");
const Realm = require("realm");

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  const realmApp = new Realm.App({ appId: "<Your App ID>"}); // Replace <Your App ID> with your application id
  let credentials = Realm.Credentials.anonymous();
  // log in anonymously
  let user = await realmApp.logIn(credentials);

  const PersonSchema = {
    name: 'Person',
    properties: {
      _id: 'objectId',
      name: 'string'
    },
    primaryKey: '_id',
  };

  const config = {
    schema: [PersonSchema],
    path: "myrealm.realm",
    sync: {
      user: user,
      partitionValue: "My Partition"
    }
  };
  // open a synced realm

  const realm = await Realm.open(config)


  // when receiving an "asynchronous-message" from the renderer process,
  // upload all local changes to the synced realm

  ipcMain.on("asynchronous-message", (event, arg) => {

    if (arg === "sync") {
      console.log("Syncing all local changes");

      realm.syncSession.uploadAllLocalChanges();

    }
  });

  createWindow();
});