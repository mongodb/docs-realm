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
        // TODO: do i need this here now that it's deprecated?
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
  test("Manually recover unsynced changes", async () => {
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
    let realm = await Realm.open(config);

    // :snippet-start: track-updates-to-objects
    const DogSchema = {
      name: "Dog",
      properties: {
        name: "string",
        age: "int?",
        lastUpdated: "int",
      },
    };

    // :snippet-end:

    // :snippet-start: config
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        clientReset: {
          mode: "manual",
        },
        error: handleSyncError, // callback function defined later
      },
    };
    // :snippet-end:
    // :snippet-start: last-synced-realm
    const LastSyncedSchema = {
      name: "LastSynced",
      properties: {
        realmTracked: "string",
        timestamp: "int?",
      },
      primaryKey: "realmTracked",
    };
    const lastSyncedConfig = { schema: [LastSyncedSchema] };
    const lastSyncedRealm = await Realm.open(lastSyncedConfig);
    lastSyncedRealm.write(() => {
      lastSyncedRealm.create("LastSynced", {
        realmTracked: "Dog",
      });
    });
    // :snippet-end:
    // :snippet-start: track-sync-session
    // Listens for changes to the Dogs collection
    realm.objects("Dog").addListener(async () => {
      // only update LastSynced if sync session is connected
      // and all local changes are synced
      if (realm.syncSession.isConnected()) {
        await realm.syncSession.uploadAllLocalChanges();
        lastSyncedRealm.write(() => {
          lastSyncedRealm.create("LastSynced", {
            realmTracked: "Dog",
            timestamp: Date.now(),
          });
        });
      }
    });
    // :snippet-end:
    // :snippet-start: handle-sync-error
    async function handleSyncError(_session, error) {
      if (error.name === "ClientReset") {
        const realmPath = realm.path; // realm.path will not be accessible after realm.close()
        realm.close(); // you must close all realms before proceeding

        // pass your realm app instance, and realm path to initiateClientReset()
        // TODO: do i need this now that it's deprecated?
        Realm.App.Sync.initiateClientReset(app, realmPath);

        realm = await Realm.open(config);
        const oldRealm = await Realm.open(error.config);

        const lastSyncedTime = lastSyncedRealm.objectForPrimaryKey(
          "LastSynced",
          "Dog"
        ).timestamp;
        const unsyncedDogs = oldRealm
          .objects("Dog")
          .filtered(`lastUpdated > ${lastSyncedTime}`);
        // add unsynced dogs to synced realm
        realm.write(() => {
          unsyncedDogs.forEach((dog) => {
            realm.create("Dog", dog, "modified");
          });
        });

        // delete dogs from synced realm that were deleted locally
        const syncedDogs = realm
          .objects("Dog")
          .filtered(`lastUpdated <= ${lastSyncedTime}`);
        realm.write(() => {
          syncedDogs.forEach((dog) => {
            if (!oldRealm.objectForPrimaryKey("Dog", dog._id)) {
              realm.delete(dog);
            }
          });
        });
        // make sure everything syncs and close old realm
        await realm.syncSession.uploadAllLocalChanges();
        oldRealm.close();
      } else {
        console.log(`Received error ${error.message}`);
      }
    }
    // :snippet-end:
  });
});

// unused track-sync-session code
// const syncSession = Realm.App.Sync.getSyncSession(
//   app.currentUser,
//   config.sync.partitionValue
// );
// syncSession.addProgressNotification(
//   "upload",
//   "reportIndefinitely",
//   (transferred, transferable) => {
//     // signifies all data transferred
//     if (transferred === transferable) {
//       lastSyncedRealm.write(() => {
//         lastSyncedRealm.create(
//           "LastSynced",
//           {
//             realmTracked: "Dog",
//             timestamp: Date.now(),
//           },
//           "modified"
//         );
//       });
//     }
//   }
// );
