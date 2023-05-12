import Realm from "realm";
import fs from "fs";

describe("CONFIGURE FLEXIBLE SYNC", () => {
  const app = new Realm.App({ id: "js-flexible-oseso" });
  const DogSchema = {
    name: "Dog",
    properties: {
      _id: "string",
      name: "string",
      age: "int?",
    },
    primaryKey: "_id",
  };

  beforeAll(async () => {
    const credentials = Realm.Credentials.anonymous();

    await app.logIn(credentials);
  });

  // afterAll(async () => {
  //   if (app.currentUser) {
  //     app.deleteUser(app.currentUser);
  //   }
  // });

  // This test seems to be somewhat inconsistent - not always throwing an error.
  test("handle sync errors", async () => {
    let errorName: string | undefined = undefined;

    // :snippet-start: realm-error-handling
    const config: Realm.Configuration = {
      schema: [DogSchema],
      sync: {
        flexible: true,
        user: app.currentUser!,
        onError: (session, syncError) => {
          // Call your Sync error handler.
          handleSyncError(session, syncError);
        },
      },
    };

    // Open realm with config that contains error handler.
    const realm = await Realm.open(config);

    function handleSyncError(
      session: Realm.App.Sync.Session,
      error: Realm.SyncError | Realm.ClientResetError
    ) {
      // ... handle the error using session and error information.
      console.log(session);
      console.debug(error);

      errorName = error.name; // :remove:
    }
    // :snippet-end:

    // Set up so that we can attempt a write transaction to a collection
    // with denyAll permissions. This throws a SyncError
    const dogs = realm.objects("Dog");

    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(dogs, {
        name: "testDoggos",
      });
    });

    realm.write(() => {
      realm.create("Dog", {
        _id: "third bestest boy",
        name: "Bartemaeus",
        age: 7,
        treat: "ice cream",
      });
    });

    expect(errorName).toBe("SyncError");
  });
});

/*
ABOUT THESE SKIPPED TESTS
These old sync "tests" have always been skipped. Apparently, there were
some problems with Jest and synced realms in the past. These tests
are all for Partition-Based Sync, which we're not actively documenting anymore.
Becuase of that, we shouldn't spend time maintaining these test. Instead, the
generated examples should be moved to a Partition-Based Sync page in the Node.js
SDK docs.

The skipped tests in this file have been updated for TypeScript, but not
properly tested.
*/

// describe.skip("CONFIGURE PARTITION-BASED SYNC", () => {
//   const app = new Realm.App({ id: "example-testers-kvjdy" });
//   const DogSchema = {
//     name: "Dog",
//     properties: {
//       name: "string",
//       age: "int?",
//     },
//   };

//   beforeAll(async () => {
//     const credentials = Realm.Credentials.anonymous();

//     await app.logIn(credentials);
//   });

//   afterAll(async () => {
//     if (app.currentUser) {
//       app.deleteUser(app.currentUser);
//     }
//   });

//   test.skip("should perform a client reset", async () => {
//     const app = new Realm.App({ id: "<Your App ID>" });
//     const credentials = Realm.Credentials.anonymous();
//     await app.logIn(credentials);
//     // :snippet-start: sync-changes-between-devices-perform-a-client-reset
//     const realm = await Realm.open(config);
//     function errorSync(_session, error) {
//       if (realm) {
//         if (error.name === "ClientReset") {
//           const realmPath = "<Your Realm Path>";

//           realm.close();

//           console.log(`Error ${error.message}, need to reset ${realmPath}…`);
//           Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
//           console.log(`Creating backup from ${error.config.path}…`);
//           // Move backup file to a known location for a restore
//           fs.renameSync(error.config.path, realmPath + "~");
//           // Discard the reference to the realm instance
//           realm = null;
//         } else {
//           console.log(`Received error ${error.message}`);
//         }
//       }
//     }
//     const config: Realm.Configuration = {
//       schema: [DogSchema], // predefined schema
//       sync: {
//         user: app.currentUser,
//         partitionValue: "MyPartitionValue",
//         error: errorSync,
//       },
//     };
//     // :snippet-end:
//     expect(1).toBe(2);
//     realm.close();
//   });

//   // this test is skipped because we currently are unable to test Synced Realms
//   // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
//   test.skip("should pause or resume a sync session", async () => {
//     let timesConnectionStateHasChanged = 0; // inititally the connection state has never been changed
//     const app = new Realm.App({ id: "<Your App ID>" });
//     const credentials = Realm.Credentials.anonymous();
//     await app.logIn(credentials);
//     // :snippet-start: sync-changes-between-devices-pause-or-resume-sync-session
//     const OpenRealmBehaviorConfiguration = {
//       type: "openImmediately",
//     };

//     const config: Realm.Configuration = {
//       schema: [DogSchema], // predefined schema
//       sync: {
//         user: app.currentUser,
//         partitionValue: "MyPartitionValue",
//         newRealmFileBehavior: OpenRealmBehaviorConfiguration,
//         existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
//       },
//     };
//     let realm = await Realm.open(config);
//     const syncSession = realm.syncSession;

//     // :remove-start:
//     syncSession.addConnectionNotification((newState, oldState) => {
//       timesConnectionStateHasChanged += 1;
//     });
//     // :remove-end:
//     // Pause synchronization
//     syncSession.pause();
//     // Later, resume synchronization
//     syncSession.resume();
//     // :snippet-end:
//     expect(timesConnectionStateHasChanged).toBe(2); // connection state should've changed once for pausing and once for resuming
//     realm.close();
//   });

//   // this test is skipped because we currently are unable to test Synced Realms
//   // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
//   // react native only (not node)
//   test.skip("should check the connection state", async () => {
//     const app = new Realm.App({ id: "<Your App ID>" });
//     const credentials = Realm.Credentials.anonymous();
//     await app.logIn(credentials);
//     // :snippet-start: sync-changes-between-devices-check-network-connection
//     const config: Realm.Configuration = {
//       schema: [DogSchema], // predefined schema
//       sync: {
//         user: app.currentUser,
//         partitionValue: "MyPartitionValue",
//       },
//     };
//     let realm = await Realm.open(config);
//     const syncSession = realm.syncSession;
//     const connectionState = syncSession.connectionState();
//     // :snippet-end:
//     expect(["Disconnected", "Connecting", "Connected"]).toContain(
//       connectionState
//     );
//     realm.close();
//   });

//   test.skip("should sync changes in the background", async () => {
//     const app = new Realm.App({ id: "<Your App ID>" });
//     const credentials = Realm.Credentials.anonymous();
//     await app.logIn(credentials);

//     // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-OpenRealmBehaviorObject
//     const OpenRealmBehaviorConfiguration = {
//       type: "openImmediately",
//     };
//     // :snippet-end:

//     // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-config
//     const config = {
//       schema: [DogSchema], // predefined schema
//       sync: {
//         user: app.currentUser,
//         partitionValue: "MyPartitionValue",
//         // The behavior to use when this is the first time opening a realm.
//         newRealmFileBehavior: OpenRealmBehaviorConfiguration,
//         // The behavior to use when a realm file already exists locally,
//         // i.e. you have previously opened the realm.
//         existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
//       },
//     };
//     // :snippet-end:

//     // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-open-realm
//     const realm = await Realm.open(config);
//     // :snippet-end:

//     // you can test that a realm has been open in general (but not if a realm has been open with a specific path or config)
//     expect(realm).toBe(new Realm(config));
//   });
// });
