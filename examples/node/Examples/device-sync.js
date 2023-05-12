import Realm from "realm";

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
    let errorName;

    // :snippet-start: error-handling
    const config = {
      schema: [DogSchema],
      sync: {
        flexible: true,
        user: app.currentUser,
        onError: (session, syncError) => {
          // Call your Sync error handler.
          handleSyncError(session, syncError);
        },
      },
    };

    // Open realm with config that contains error handler.
    const realm = await Realm.open(config);

    function handleSyncError(session, error) {
      // ... handle the error using session and error information.
      console.log(session);
      console.log(error);
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
    const behaviorConfiguration = {
      type: "openImmediately",
    };

    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
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
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
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

  // TODO: Convert to TS and fix
  test.skip("check upload & download progress for a sync session", async () => {
    let progressNotificationHasBeenTriggered = false;
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    // :snippet-start: sync-changes-between-devices-check-upload-and-download-progress
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };

    var config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    let realm = await Realm.open(config);
    const syncSession = realm.syncSession;
    syncSession.addProgressNotification(
      "upload",
      "reportIndefinitely",
      (transferred, transferable) => {
        // :remove-start:
        progressNotificationHasBeenTriggered = true;
        // :remove-end:
        console.log(`${transferred} bytes has been transferred`);
        console.log(
          `There are ${transferable} total transferable bytes, including the ones that have already been transferred`
        );
      }
    );
    // Upload something
    let dog;
    realm.write(() => {
      dog = realm.create("Dog", {
        name: "Fido",
        age: 2,
      });
    });
    // use dog

    // remember to unregister the progress notifications
    syncSession.removeProgressNotification((transferred, transferable) => {
      console.log(`There was ${transferable} total transferable bytes`);
      console.log(`${transferred} bytes were transferred`);
    });
    // :snippet-end:
    expect(progressNotificationHasBeenTriggered).toBe(true);
    // Delete the dog from the realm.
    realm.write(() => {
      realm.delete(dog);
    });
    realm.close();
  });

  test("sync changes in the background", async () => {
    // :snippet-start: background-sync-behavior
    const behaviorConfiguration = {
      type: "openImmediately",
    };
    // :snippet-end:

    // :snippet-start: background-sync-configuration
    const config = {
      schema: [DogSchema],
      sync: {
        user: app.currentUser,
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
