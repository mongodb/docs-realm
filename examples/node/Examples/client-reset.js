import Realm from "realm";
import { ObjectId } from "bson";

const REALM_APP_ID = "myapp-zufnj";

describe("Client Reset with Seamless Loss", () => {
  // these tests can take longer than most, causing timeouts that make
  // the Github Actions CI fail
  jest.setTimeout(20000);

  const DogSchema = {
    name: "Doggo3",
    properties: {
      _id: "objectId",
      name: "string",
      age: "int?",
      _partition: "string",
    },
    primaryKey: "_id",
  };
  let realm;
  afterEach(() => {
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
      realm.close();
    }
  });
  test("Discard unsynced changes", async () => {
    let beforeCalled = false;
    let afterCalled = false;
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
    const clientResetSuccess = await new Promise((resolve, reject) => {
      // :snippet-start: discard-unsynced-changes
      const config = {
        schema: [DogSchema],
        sync: {
          user: app.currentUser,
          partitionValue: "MyPartitionValue",
          clientReset: {
            mode: "discardLocal",
            clientResetBefore: (realm) => {
              console.log("Beginning client reset for ", realm.path);
              // :remove-start:
              beforeCalled = true;
              // :remove-end:
            },
            clientResetAfter: (beforeRealm, afterRealm) => {
              console.log("Finished client reset for", beforeRealm.path);
              console.log("New realm path", afterRealm.path);
              // :remove-start:
              afterCalled = true;
              resolve(beforeCalled && afterCalled);
              // :remove-end:
            },
          },
        },
      };
      // :snippet-end:
      Realm.open(config).then((openedRealm) => {
        realm = openedRealm;
        realm.write(() => {
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Chippy",
            age: 12,
            _partition: "MyPartitionValue",
          });
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Jasper",
            age: 11,
            _partition: "MyPartitionValue",
          });
        });
        realm.syncSession._simulateError(
          211,
          "Simulate Client Reset",
          "realm::sync::ProtocolError",
          false
        );
      });
    });
    expect(clientResetSuccess).toBe(true);
  });

  // skipping because there's no way to manually trigger destructive schema changes
  // client reset from `realm.syncSession._simulateError`. error code `211` should have
  // worked to trigger client reset w destructive schema changes but didn't.
  // this is a known issue being investigated by the JS team.
  // once there is a way to trigger client reset w destructive schema changes from
  // the test, this test will probably have to be refactored slightly to make work.
  test.skip("Discard unsynced changes after destructive schema changes", async () => {
    const DogSchema = {
      name: "Doggo4",
      properties: {
        _id: "objectId",
        name: "string",
        age: "int?",
        _partition: "string",
      },
      primaryKey: "_id",
    };
    const app = new Realm.App({ id: REALM_APP_ID });
    await app.logIn(new Realm.Credentials.anonymous());
    const clientResetSuccess = await new Promise((resolve, reject) => {
      // :snippet-start: discard-unsynced-changes-after-destructive-schema-changes
      // Once you have opened your Realm, you will have to keep a reference to it.
      // In the error handler, this reference is called `realm`
      async function handleSyncError(session, syncError) {
        console.error(JSON.stringify(syncError, null, 2));
        if (syncError.name == "ClientReset") {
          console.log(syncError);
          try {
            console.log("error type is ClientReset....");
            const path = realm.path; // realm.path will no be accessible after realm.close()
            realm.close();
            Realm.App.Sync.initiateClientReset(app, path);

            // Download Realm from the server.
            // Ensure that the backend state is fully downloaded before proceeding,
            // which is the default behavior.
            realm = await Realm.open(config);
            // :remove-start:
            expect(realm.isClosed).toBe(false);
            resolve(true);
            // :remove-end:
            // :uncomment-start:
            // realm.close();
            // :uncomment-end:
          } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            reject(err); // :remove:
          }
        } else {
          // ...handle other error types
          // :remove-start:
          console.log(syncError);
          reject("not a client reset error :(");
          // :remove-end:
        }
      }

      const config = {
        schema: [DogSchema],
        sync: {
          user: app.currentUser,
          partitionValue: "MyPartitionValue",
          clientReset: {
            mode: "discardLocal",
            clientResetBefore: (realm) => {
              // NOT used with destructive schema changes
              console.log("Beginning client reset for ", realm.path);
              // :remove-start:
              reject(
                "Test shouldn't touch automatic client reset logic (before)"
              );
              // :remove-end:
            },
            clientResetAfter: (beforeRealm, afterRealm) => {
              // NOT used with destructive schema changes
              console.log("Finished client reset for", beforeRealm.path);
              console.log("New realm path", afterRealm.path);
              // :remove-start:
              reject(
                "Test shouldn't touch automatic client reset logic (after)"
              );
              // :remove-end:
            },
          },
          error: handleSyncError, // invoked with destructive schema changes
        },
      };
      // :snippet-end:
      Realm.open(config).then((openedRealm) => {
        realm = openedRealm;
        realm.write(() => {
          realm.create("Doggo3", {
            _id: new ObjectId(),
            name: "Maggie",
            age: 13,
            _partition: "MyPartitionValue",
          });
        });
        realm.syncSession._simulateError(
          211,
          "Simulate Client Reset",
          "realm::sync::ProtocolError",
          true
        );
      });
    });
    expect(clientResetSuccess).toBe(true);
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

        // pass your realm app instance and realm path to initiateClientReset()
        Realm.App.Sync.initiateClientReset(app, realmPath);

        // Redownload the realm
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
