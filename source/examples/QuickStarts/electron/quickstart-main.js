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

app.whenReady().then(async () => {
  const realmApp = new Realm.App({ id: "<Your App ID>" }); // Replace <Your App ID> with your application id
  let credentials = Realm.Credentials.anonymous();
  // log in anonymously
  let user = await realmApp.logIn(credentials);

  const PersonSchema = {
    name: "Person",
    properties: {
      _id: "objectId",
      name: "string",
    },
    primaryKey: "_id",
  };

  const config = {
    schema: [PersonSchema],
    path: "myrealm.realm",
    sync: {
      user: user,
      partitionValue: "My Partition",
    },
  };
  // open a synced realm
  const realm = await Realm.open(config);

  // Get all Persons in the realm
  const persons = realm.objects("Person");

  // when receiving an "asynchronous-message" from the renderer process,
  // upload all local changes to the synced realm
  ipcMain.on("asynchronous-message", (event, arg) => {
    if (arg === "sync") {
      realm.syncSession.uploadAllLocalChanges();
      console.log("main process: Syncing all local changes");
      console.log(
        `main process: Created person object: \t ${JSON.stringify(
          persons[0],
          null,
          2
        )}`
      );

      // send a reply to the renderer process with the created person's name
      event.reply(
        "asynchronous-reply",
        `created person object with the name ${persons[0].name}`
      );
    }
  });

  createWindow();
});
