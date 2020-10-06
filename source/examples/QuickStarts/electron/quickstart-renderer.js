const { ipcRenderer } = require("electron");
const Realm = require("realm");
const ObjectId = require("bson").ObjectId;

async function run() {
  const realmApp = new Realm.App({ id: "<Your App ID>" }); // Replace <Your App ID> with your application id
  let credentials = Realm.Credentials.anonymous();
  // log in anonymously
  let user = await realmApp.logIn(credentials);

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

  const personList = realm.objects("Person");

  // create a new "Person"
  realm.write(() => {
    john = realm.create("Person", {
      _id: new ObjectId(),
      name: "John Smith",
    });
  });

  // Sending a request for sync to main

  ipcRenderer.send("asynchronous-message", "sync");
}

run();
