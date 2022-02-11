import Realm from "realm";
import fs from "fs";

const REALM_APP_ID = "myapp-zufnj";
const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("Client Reset with Seamless Loss", () => {
  let app;
  beforeAll(async () => {
    app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
  });
  afterAll(async () => {
    const user = app.currentUser;
    await app.currentUser.logOut();
    app.deleteUser(user);
  });
  test("Discard unsynced changes", async () => {
    // :snippet-start: discard-unsynced-changes
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        clientReset: {
          mode: "discardLocal",
          clientResyncBefore: (realm) => {
            console.log("Beginning client reset for ", realm.path);
          },
          clientResyncAfter: (beforeRealm, afterRealm) => {
            console.log("Finished client reset for", beforeRealm.path);
            console.log("New realm path", afterRealm.path);
          },
        },
      },
    };
    // :snippet-end:
    const realm = await Realm.open(config);
    realm.close();
  });
  test("Discard unsynced changes after destructive schema changes", async () => {
    let realm;
    // :snippet-start: discard-unsynced-changes-after-destructive-schema-changes
    // Once you have opened your Realm, you will have to keep a reference to it.
    // In the error handler, this reference is called `realm`
    async function handleSyncError(session, syncError) {
      if (syncError.name == "ClientReset") {
        const path = realm.path; // realm.path will no be accessible after realm.close()
        realm.close();
        Realm.App.Sync.initiateClientReset(app, path);

        // Download Realm from the server.
        // Ensure that the backend state is fully downloaded before proceeding,
        // which is the default behavior.
        realm = await Realm.open(config);
        realm.close();
      }
    }

    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        clientReset: {
          mode: "discardLocal",
          clientResyncBefore: (realm) => {
            console.log("Beginning client reset for ", realm.path);
          },
          clientResyncAfter: (beforeRealm, afterRealm) => {
            console.log("Finished client reset for", beforeRealm.path);
            console.log("New realm path", afterRealm.path);
          },
        },
        error: handleSyncError,
      },
    };
    // :snippet-end:
    realm = await Realm.open(config);
  });
});

describe("Manual client reset", () => {
  test("Manually recover unsynced changes", () => {
    // :snippet-start: track-updates-to-objects
    // :snippet-end:
    // :snippet-start: track-successful-syncs
    // :snippet-end:
    // :snippet-start: manually-recovery-function
    // :snippet-end:
  });
});
