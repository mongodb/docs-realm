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
  test.skip("handle sync errors", async () => {
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

describe("CONFIGURE PARTITION-BASED SYNC", () => {
  const app = new Realm.App({ id: "example-testers-kvjdy" });
  const DogSchema = {
    name: "Dog",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string?",
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

  test("should pause or resume a sync session", async () => {
    // :snippet-start: pause-sync-session
    const OpenRealmBehaviorConfiguration: Realm.OpenRealmBehaviorConfiguration =
      {
        type: Realm.OpenRealmBehaviorType.OpenImmediately,
      };

    const config: Realm.Configuration = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser!,
        partitionValue: "MyPartitionValue",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    const realm = await Realm.open(config);

    const pauseSyncSession = () => {
      realm.syncSession?.pause();
    };

    const resumeSyncSession = () => {
      realm.syncSession?.resume();
    };
    // :snippet-end:

    expect(realm.syncSession?.state).toBe(Realm.SessionState.Active);

    pauseSyncSession();
    expect(realm.syncSession?.state).toBe(Realm.SessionState.Inactive);

    resumeSyncSession();
    expect(realm.syncSession?.state).toBe(Realm.SessionState.Active);

    realm.close();
  });

  // // this test is skipped because we currently are unable to test Synced Realms
  // // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  // // react native only (not node)
  // test.skip("should check the connection state", async () => {
  //   const app = new Realm.App({ id: "<Your App ID>" });
  //   const credentials = Realm.Credentials.anonymous();
  //   await app.logIn(credentials);
  //   // :snippet-start: sync-changes-between-devices-check-network-connection
  //   const config: Realm.Configuration = {
  //     schema: [DogSchema], // predefined schema
  //     sync: {
  //       user: app.currentUser,
  //       partitionValue: "MyPartitionValue",
  //     },
  //   };
  //   let realm = await Realm.open(config);
  //   const syncSession = realm.syncSession;
  //   const connectionState = syncSession.connectionState();
  //   // :snippet-end:
  //   expect(["Disconnected", "Connecting", "Connected"]).toContain(
  //     connectionState
  //   );
  //   realm.close();
  // });

  // test.skip("should sync changes in the background", async () => {
  //   const app = new Realm.App({ id: "<Your App ID>" });
  //   const credentials = Realm.Credentials.anonymous();
  //   await app.logIn(credentials);

  //   // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-OpenRealmBehaviorObject
  //   const OpenRealmBehaviorConfiguration = {
  //     type: "openImmediately",
  //   };
  //   // :snippet-end:

  //   // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-config
  //   const config = {
  //     schema: [DogSchema], // predefined schema
  //     sync: {
  //       user: app.currentUser,
  //       partitionValue: "MyPartitionValue",
  //       // The behavior to use when this is the first time opening a realm.
  //       newRealmFileBehavior: OpenRealmBehaviorConfiguration,
  //       // The behavior to use when a realm file already exists locally,
  //       // i.e. you have previously opened the realm.
  //       existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
  //     },
  //   };
  //   // :snippet-end:

  //   // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-open-realm
  //   const realm = await Realm.open(config);
  //   // :snippet-end:

  //   // you can test that a realm has been open in general (but not if a realm has been open with a specific path or config)
  //   expect(realm).toBe(new Realm(config));
  // });
});
