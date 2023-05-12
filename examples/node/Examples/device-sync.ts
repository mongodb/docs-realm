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
ABOUT THE PARTITION-BASED SYNC TESTS
The following tests are all for Partition-Based Sync, which we're not actively
documenting anymore. I've updated them to TypeScript and made it so that they're
actually runnable. Most likely, these won't be touched again in the future.
Eventually, the generated examples should be moved to a dedicated Partition-Based Sync
page in the Node.js SDK docs.
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

  test("pause or resume a sync session", async () => {
    // :snippet-start: pause-sync-session
    const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
      type: Realm.OpenRealmBehaviorType.OpenImmediately,
    };

    const config: Realm.Configuration = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser!,
        partitionValue: "MyPartitionValue",
        newRealmFileBehavior: behaviorConfiguration,
        existingRealmFileBehavior: behaviorConfiguration,
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

  test("check the connection state", async () => {
    // :snippet-start: check-network-connection
    const config: Realm.Configuration = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser!,
        partitionValue: "MyPartitionValue",
      },
    };

    const realm = await Realm.open(config);

    const connectionState = realm.syncSession?.connectionState;
    // :snippet-end:

    expect(["disconnected", "connecting", "connected"]).toContain(
      connectionState
    );

    realm.close();
  });

  test("sync changes in the background", async () => {
    // :snippet-start: background-sync-behavior
    const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
      type: Realm.OpenRealmBehaviorType.OpenImmediately,
    };
    // :snippet-end:

    // :snippet-start: background-sync-configuration
    const config: Realm.Configuration = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser!,
        partitionValue: "MyPartitionValue",
        // The behavior to use when this is the first time opening a realm.
        newRealmFileBehavior: behaviorConfiguration,
        // The behavior to use when a realm file already exists locally,
        // i.e. you have previously opened the realm.
        existingRealmFileBehavior: behaviorConfiguration,
      },
    };
    // :snippet-end:

    // :snippet-start: open-realm
    const realm = await Realm.open(config);
    // :snippet-end:

    // Not sure if there's a way to test how a Realm is opened.
    // Testing to see if it opened validates the config isn't broken.
    expect(realm.isClosed).toBe(false);

    realm.close();
  });
});
