import Realm from "realm";
import nock from "nock";

const APP_ID = "js-flexible-oseso";

class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      _id: "objectId",
      make: "string",
      model: "string",
      miles: "int",
    },
    primaryKey: "_id",
  };
}

describe("FLEXIBLE SYNC REALM CONFIGURATIONS", () => {
  const app = new Realm.App({ id: "js-flexible-oseso" });

  beforeEach(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();

    await app.logIn(credentials);
  });

  test("open and close a synced realm without internet", async () => {
    await app.currentUser?.logOut();

    // Log user into your App Services App.
    // On first login, the user must have a network connection.
    const getUser = async () => {
      // If the app is offline, but credentials are
      // cached, return existing user.
      if (app.currentUser) {
        return app.currentUser;
      }
      expect(app.currentUser).toBeFalsy(); // :remove:

      // If the device has no cached user credentials, log in.
      const credentials = Realm.Credentials.anonymous();
      return await app.logIn(credentials);
    };

    // :snippet-start: open-synced-offline
    const behaviorConfiguration = {
      type: "openImmediately",
      timeOut: 1000,
      timeOutBehavior: "openLocalRealm",
    };

    const config = {
      schema: [Car],
      sync: {
        flexible: true,
        user: await getUser(),
        existingRealmFileBehavior: behaviorConfiguration,
        newRealmFileBehavior: behaviorConfiguration,
      },
    };
    nock.disableNetConnect(); // :remove:

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    realm.close();
    expect(realm.isClosed).toBe(true);

    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("open and close a realm with background sync", async () => {
    await app.currentUser?.logOut();

    const getUser = async () => {
      if (app.currentUser) {
        return app.currentUser;
      }

      expect(app.currentUser).toBeFalsy();

      const credentials = Realm.Credentials.anonymous();
      return await app.logIn(credentials);
    };

    // :snippet-start: open-synced-background
    const behaviorConfiguration = {
      type: "openImmediately",
    };

    const config = {
      schema: [Car],
      sync: {
        user: await getUser(),
        flexible: true,
        newRealmFileBehavior: behaviorConfiguration,
        existingRealmFileBehavior: behaviorConfiguration,
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    realm.close();
    expect(realm.isClosed).toBe(true);
  });
});

describe("PARTITION-BASED SYNC REALM CONFIGURATIONS", () => {
  const app = new Realm.App({ id: "example-testers-kvjdy" });

  beforeEach(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();

    await app.logIn(credentials);
  });

  test("open and close realm", async () => {
    // :snippet-start: open-partition-based
    const config = {
      schema: [Car],
      sync: {
        user: app.currentUser,
        partitionValue: "myPartition",
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    realm.close();

    expect(realm.isClosed).toBe(true);
  });

  test("Open local realm as synced realm with `writeCopyTo()`", async () => {
    // :snippet-start: open-local-as-synced
    const localConfig = {
      schema: [Car],
      path: "localOnly.realm",
    };
    const localRealm = await Realm.open(localConfig);
    expect(localRealm.isClosed).toBe(false); // :remove:

    const syncedConfig = {
      schema: [Car],
      path: "copyLocalToSynced.realm",
      sync: {
        user: app.currentUser,
        partitionValue: "myPartition",
      },
    };

    localRealm.writeCopyTo(syncedConfig);
    const syncedRealm = await Realm.open(syncedConfig);
    // :snippet-end:

    await syncedRealm.syncSession?.downloadAllServerChanges();
    expect(syncedRealm.isClosed).toBe(false);
    expect(syncedRealm.syncSession?.connectionState).toBe("connected");

    // clean up
    localRealm.close();
    syncedRealm.close();
  });

  test("sync encrypted to local unencrypted", async () => {
    // :snippet-start: sync-encrypted-to-local-unencrypted
    // Create a secure key.
    const encryptionKey = new Int8Array(64);
    // ... store key

    const syncedEncryptedConfig = {
      schema: [Car],
      path: "syncedEncrypted.realm",
      sync: {
        user: app.currentUser,
        partitionValue: "myPartition",
      },
      encryptionKey,
    };
    const syncedEncryptedRealm = await Realm.open(syncedEncryptedConfig);
    expect(syncedEncryptedRealm.isClosed).toBe(false); // :remove:

    const localUnencryptedConfig = {
      schema: [Car],
      path: "copyLocalUnencrypted.realm",
    };

    syncedEncryptedRealm.writeCopyTo(localUnencryptedConfig);
    const localUnencryptedRealm = await Realm.open(syncedEncryptedConfig);
    // :snippet-end:

    expect(localUnencryptedRealm.isClosed).toBe(false);

    // clean up
    await syncedEncryptedRealm.syncSession?.uploadAllLocalChanges();
    await syncedEncryptedRealm.syncSession?.downloadAllServerChanges();
    syncedEncryptedRealm.close();
    localUnencryptedRealm.close();
  });
});
