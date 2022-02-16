import Realm from "realm";
import { ObjectId } from "bson";

const REALM_APP_ID = "sync_test-ytdqo";

describe("Client Reset with Seamless Loss", () => {
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
  afterEach(() => {
    Realm.clearTestState();
  });
  it("Discard unsynced changes", () => {
    let beforeCalled = false;
    let afterCalled = false;
    const app = new Realm.App({ id: REALM_APP_ID });
    return app.logIn(new Realm.Credentials.anonymous()).then(() => {
      return new Promise((resolve, reject) => {
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
                expect(realm.objects("Doggo3").length).toBe(2);
                beforeCalled = true;
              },
              clientResetAfter: (beforeRealm, afterRealm) => {
                console.log("Finished client reset for", beforeRealm.path);
                console.log("New realm path", afterRealm.path);
                afterCalled = true;
                // TODO: change toBe from `null` to `2` once this block is entered
                expect(afterRealm.objects("Doggo3").length).toBe(null); // :remove:
              },
            },
            error: handleClientReset, // :remove:
          },
        };
        // :snippet-end:
        function handleClientReset(sender, error) {
          console.log(JSON.stringify(error, null, 2));
          reject();
        }

        const realm = new Realm(config);
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
        // realm.syncSession.uploadAllLocalChanges().then(async () => {
        //   realm.write(() => {
        //     realm.create("Doggo3", {
        //       _id: new ObjectId(),
        //       name: "Troy",
        //       age: 15,
        //       _partition: "MyPartitionValue",
        //     });
        //   });

        realm.syncSession._simulateError(
          211,
          "Simulate Client Reset",
          "realm::sync::ProtocolError",
          false
        );
        setTimeout(() => {
          expect(beforeCalled).toBe(true);
          expect(afterCalled).toBe(true);
          expect(realm.objects("Doggo3").length).toBe(2);
        }, 100);
        // });
      });
    });
  });

  it("Discard unsynced changes after destructive schema changes", async () => {
    return new Promise((resolve, reject) => {
      let realm;
      const app = new Realm.App({ id: REALM_APP_ID });
      app.logIn(new Realm.Credentials.anonymous()).then(async () => {
        // :snippet-start: discard-unsynced-changes-after-destructive-schema-changes
        // Once you have opened your Realm, you will have to keep a reference to it.
        // In the error handler, this reference is called `realm`
        async function handleSyncError(session, syncError) {
          console.error(JSON.stringify(syncError, null, 2));
          if (syncError.name == "ClientReset") {
            try {
              console.log("error type  is ClientReset....");
              const path = realm.path; // realm.path will no be accessible after realm.close()
              realm.close();
              Realm.App.Sync.initiateClientReset(app, path);

              // Download Realm from the server.
              // Ensure that the backend state is fully downloaded before proceeding,
              // which is the default behavior.
              realm = await Realm.open(config);
              expect(realm.isClosed).toBe(false);
              realm.close();
              resolve();
            } catch (err) {
              console.error(JSON.stringify(err, null, 2));
              reject(err);
            }
          } else reject();
        }

        const config = {
          schema: [DogSchema],
          sync: {
            user: app.currentUser,
            partitionValue: "MyPartitionValue",
            clientReset: {
              mode: "discardLocal",
              clientResetBefore: (realm) => {
                // not used when destructive schema changes
                console.log("Beginning client reset for ", realm.path);
              },
              clientResetAfter: (beforeRealm, afterRealm) => {
                // not used when destructive schema changes
                console.log("Finished client reset for", beforeRealm.path);
                console.log("New realm path", afterRealm.path);
              },
            },
            error: handleSyncError,
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
          realm.syncSession.uploadAllLocalChanges().then(() => {
            realm.syncSession._simulateError(
              132,
              "Simulate Client Reset",
              "realm::sync::ProtocolError",
              true
            );
          });
        });
      });
    });
  });
});

// describe("Manual client reset", () => {
//   it("Manually recover unsynced changes", async () => {
//     // :snippet-start: track-updates-to-objects
//     const DogSchema = {
//       name: "Dog",
//       properties: {
//         name: "string",
//         age: "int?",
//         lastUpdated: "int",
//       },
//     };

//     // :snippet-end:

//     // :snippet-start: config
//     const config = {
//       schema: [DogSchema],
//       sync: {
//         user: app.currentUser,
//         partitionValue: "MyPartitionValue",
//         clientReset: {
//           mode: "manual",
//         },
//         error: handleSyncError, // callback function defined later
//       },
//     };
//     // :snippet-end:
//     const app = new Realm.App({ id: REALM_APP_ID });
//     await app.logIn(new Realm.Credentials.anonymous());
//     let realm = await Realm.open(config);
//     // :snippet-start: last-synced-realm
//     const LastSyncedSchema = {
//       name: "LastSynced",
//       properties: {
//         realmTracked: "string",
//         timestamp: "int?",
//       },
//       primaryKey: "realmTracked",
//     };
//     const lastSyncedConfig = { schema: [LastSyncedSchema] };
//     const lastSyncedRealm = await Realm.open(lastSyncedConfig);
//     lastSyncedRealm.write(() => {
//       lastSyncedRealm.create("LastSynced", {
//         realmTracked: "Dog",
//       });
//     });
//     // :snippet-end:
//     // :snippet-start: track-sync-session
//     // Listens for changes to the Dogs collection
//     realm.objects("Dog").addListener(async () => {
//       // only update LastSynced if sync session is connected
//       // and all local changes are synced
//       if (realm.syncSession.isConnected()) {
//         await realm.syncSession.uploadAllLocalChanges();
//         lastSyncedRealm.write(() => {
//           lastSyncedRealm.create("LastSynced", {
//             realmTracked: "Dog",
//             timestamp: Date.now(),
//           });
//         });
//       }
//     });
//     // :snippet-end:
//     // :snippet-start: handle-sync-error
//     async function handleSyncError(_session, error) {
//       if (error.name === "ClientReset") {
//         const realmPath = realm.path; // realm.path will not be accessible after realm.close()
//         realm.close(); // you must close all realms before proceeding

//         // pass your realm app instance, and realm path to initiateClientReset()
//         Realm.App.Sync.initiateClientReset(app, realmPath);

//         realm = await Realm.open(config);
//         const oldRealm = await Realm.open(error.config);

//         const lastSyncedTime = lastSyncedRealm.objectForPrimaryKey(
//           "LastSynced",
//           "Dog"
//         ).timestamp;
//         const unsyncedDogs = oldRealm
//           .objects("Dog")
//           .filtered(`lastUpdated > ${lastSyncedTime}`);
//         // add unsynced dogs to synced realm
//         realm.write(() => {
//           unsyncedDogs.forEach((dog) => {
//             realm.create("Dog", dog, "modified");
//           });
//         });

//         // delete dogs from synced realm that were deleted locally
//         const syncedDogs = realm
//           .objects("Dog")
//           .filtered(`lastUpdated <= ${lastSyncedTime}`);
//         realm.write(() => {
//           syncedDogs.forEach((dog) => {
//             if (!oldRealm.objectForPrimaryKey("Dog", dog._id)) {
//               realm.delete(dog);
//             }
//           });
//         });
//         // make sure everything syncs and close old realm
//         await realm.syncSession.uploadAllLocalChanges();
//         oldRealm.close();
//       } else {
//         console.log(`Received error ${error.message}`);
//       }
//     }
//     // :snippet-end:
//   });
// });

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
