import Realm from "realm";

const REALM_APP_ID = "myapp-zufnj";

describe("Client Reset with Seamless Loss", () => {
  const DogSchema = {
    name: "Doggo",
    properties: {
      name: "string",
      age: "int?",
    },
  };
  test("Discard unsynced changes", async () => {
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
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
            expect(afterRealm.objects("Doggo").length).toBe(2); // :remove:
          },
        },
        error: handleClientReset, // :remove:
      },
    };
    // :snippet-end:

    async function handleClientReset(sender, error) {
      console.log(JSON.stringify(error));
      expect(error.code).toBe(211);
      expect(error.name).toBe("ClientReset");
      expect(error.message).toBe("Simulate Client Reset");
    }
    const realm = await Realm.open(config);
    realm.write(() => {
      realm.create("Doggo", { name: "Chippy", age: 12 });
      realm.create("Doggo", { name: "Jasper", age: 11 });
    });
    await realm.syncSession.uploadAllLocalChanges();
    realm.write(() => {
      realm.create("Doggo", { name: "Troy", age: 15 });
    });
    realm.syncSession._simulateError(
      211,
      "Simulate Client Reset",
      "realm::sync::ProtocolError",
      false
    );

    realm.close();
    expect(realm.isClosed).toBe(true);
    const user = app.currentUser;
    await app.currentUser.logOut();
    await app.deleteUser(user);
    Realm.clearTestState();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  test.skip("Discard unsynced changes after destructive schema changes", async () => {
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
  test.skip("Manually recover unsynced changes", async () => {
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
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
    let realm = await Realm.open(config);
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
