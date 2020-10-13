const { ipcRenderer } = require("electron");
const Realm = require("realm");
const ObjectId = require("bson").ObjectId;

async function run() {
  const realmApp = new Realm.App({ id: "tutsbrawl-qfxxj" }); // Replace <Your App ID> with your application id
  let credentials = Realm.Credentials.anonymous();
  // log in anonymously
  await realmApp.logIn(credentials);

  var PersonSchema = {
    name: "Person",
    properties: {
      _id: "objectId",
      name: "string",
    },
    primaryKey: "_id",
  };

  const config = {
    path: "myrealm.realm",
    schema: [PersonSchema],
    sync: true,
  };

  // open a non synced realm
  const realm = new Realm(config);

  // create a new "Person"
  realm.write(() => {
    john = realm.create("Person", {
      _id: new ObjectId(),
      name: "John Smith",
    });
  });

  ipcRenderer.send("asynchronous-message", "sync");

  // receive a reply with the created person's name from the main process
  ipcRenderer.on("asynchronous-reply", (event, arg) => {
    console.log(`renderer process:`, arg);
  });
}

run();
