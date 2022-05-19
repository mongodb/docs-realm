import Realm from "realm";
import fs from "fs";

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("Sync Changes Between Devices", () => {
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should perform a client reset", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    // :snippet-start: sync-changes-between-devices-perform-a-client-reset
    let realm = await Realm.open(config);
    function errorSync(_session, error) {
      if (realm) {
        if (error.name === "ClientReset") {
          const realmPath = "<Your Realm Path>";

          realm.close();

          console.log(`Error ${error.message}, need to reset ${realmPath}…`);
          Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
          console.log(`Creating backup from ${error.config.path}…`);
          // Move backup file to a known location for a restore
          fs.renameSync(error.config.path, realmPath + "~");
          // Discard the reference to the realm instance
          realm = null;
        } else {
          console.log(`Received error ${error.message}`);
        }
      }
    }
    var config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        error: errorSync,
      },
    };
    // :snippet-end:
    expect(1).toBe(2);
    realm.close();
  });
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should pause or resume a sync session", async () => {
    let timesConnectionStateHasChanged = 0; // inititally the connection state has never been changed
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    // :snippet-start: sync-changes-between-devices-pause-or-resume-sync-session
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

    // :hide-start:
    syncSession.addConnectionNotification((newState, oldState) => {
      timesConnectionStateHasChanged += 1;
    });
    // :hide-end:
    // Pause synchronization
    syncSession.pause();
    // Later, resume synchronization
    syncSession.resume();
    // :snippet-end:
    expect(timesConnectionStateHasChanged).toBe(2); // connection state should've changed once for pausing and once for resuming
    realm.close();
  });
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  // react native only (not node)
  test.skip("should check the connection state", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    // :snippet-start: sync-changes-between-devices-check-network-connection
    var config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
      },
    };
    let realm = await Realm.open(config);
    const syncSession = realm.syncSession;
    const connectionState = syncSession.connectionState();
    // :snippet-end:
    expect(["Disconnected", "Connecting", "Connected"]).toContain(
      connectionState
    );
    realm.close();
  });
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should check upload & download progress for a sync session", async () => {
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
        // :hide-start:
        progressNotificationHasBeenTriggered = true;
        // :hide-end:
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
  test.skip("should sync changes in the background", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);

    // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-OpenRealmBehaviorObject
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    // :snippet-end:

    // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-create-config
    const config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        // The behavior to use when this is the first time opening a realm.
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        // The behavior to use when a realm file already exists locally,
        // i.e. you have previously opened the realm.
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // :snippet-end:

    // :snippet-start: sync-changes-between-devices-sync-changes-in-the-background-open-realm
    const realm = await Realm.open(config);
    // :snippet-end:

    // you can test that a realm has been open in general (but not if a realm has been open with a specific path or config)
    expect(realm).toBe(new Realm(config));
  });
  test.skip("should handle sync errors", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);

    // :snippet-start: sync-changes-between-devices-handle-sync-errors
    var config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        error: (_session, error) => {
          (error) => {
            console.log(error.name, error.message);
          };
        },
      },
    };
    const realm = await Realm.open(config);
    // :snippet-end:
  });
});
