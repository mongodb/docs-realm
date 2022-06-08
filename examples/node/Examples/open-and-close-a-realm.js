import Realm from "realm";
import nock from "nock";

describe("Open and Close a Realm", () => {
  test("should open and close a local realm", async () => {
    // :snippet-start: open-local-realm-with-car-schema
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };
    // Open a local realm file with a particular path & predefined Car schema
    try {
      const realm = await Realm.open({
        schema: [Car],
      });

      // :snippet-start: close-local-realm
      realm.close();
      // :snippet-end:

      expect(realm.isClosed).toBe(true); // :remove:
    } catch (err) {
      console.error("Failed to open the realm", err.message);
    }
    // :snippet-end:

    // :snippet-start: open-local-realm-synchronously
    // Synchronously open a local realm file with a particular path & predefined Car schema
    try {
      const synchronouslyOpenedRealm = new Realm({
        schema: [Car],
      });

      synchronouslyOpenedRealm.close();
      expect(synchronouslyOpenedRealm.isClosed).toBe(true); // :remove:
    } catch (err) {
      console.error("Failed to open the realm", err.message);
    }
    // :snippet-end:

    // You can test whether a realm has been opened in general
    // (but not if a realm has been opened with a specific path or schema)
    try {
      const syncRealm = new Realm({
        schema: [Car],
      });

      const asyncRealm = await Realm.open({
        schema: [Car],
      });

      expect(asyncRealm).toStrictEqual(syncRealm);
      syncRealm.close();
      asyncRealm.close();
    } catch (err) {
      console.error(err);
    }
  });

  test.skip("should open an in memory realm", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };
    // :snippet-start: open-and-close-an-in-memory-realm
    const realm = await Realm.open({
      inMemory: true,
      schema: [Car],
    });
    // :snippet-end:
    expect(realm.inMemory).toBe(true);
    realm.close();
  });

  test("should open and close a synced realm with internet", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };

    const app = new Realm.App({ id: "demo_app-cicfi" });

    try {
      await app.logIn(new Realm.Credentials.anonymous());
    } catch (err) {
      console.error("failed to login user", err.message);
    }

    // :snippet-start: open-synced-realm-online-with-car-schema
    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: app.currentUser, // already logged in user
        partitionValue: "myPartition",
      },
    };

    try {
      const realm = await Realm.open(config);

      realm.close();
      expect(realm.isClosed).toBe(true); // :remove:
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
    // :snippet-end:xw
  });

  test("should open and close a sycned realm without internet", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };

    const app = new Realm.App({ id: "demo_app-cicfi" });

    // :snippet-start: use-cached-user-to-login
    // Log the user into the backend app.
    // The first time you login, the user must have a network connection.
    const getUser = async () => {
      // Check for an existing user.
      // If the user is offline but credentials are
      // cached, this returns the existing user.
      if (app.currentUser) return app.currentUser;
      // If the device has no cached user credentials, log them in.
      const credentials = Realm.Credentials.anonymous();
      return await app.logIn(credentials);
    };
    // :snippet-end:

    // :snippet-start: open-synced-realm-offline-with-car-schema
    // :snippet-start: open-synced-realm-config
    const openRealmBehaviorConfig = {
      type: "downloadBeforeOpen",
      timeOut: 1000,
      timeOutBehavior: "openLocalRealm",
    };

    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: await getUser(), // already logged in user
        partitionValue: "myPartition",
        existingRealmFileBehavior: openRealmBehaviorConfig,
        newRealmFileBehavior: openRealmBehaviorConfig,
      },
    };
    // :snippet-end:
    // :remove-start:
    nock.disableNetConnect();
    // :remove-end:

    try {
      const realm = await Realm.open(config);

      realm.close();
      expect(realm.isClosed).toBe(true); // :remove:
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
    // :snippet-end:

    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("Should open and close a realm with background sync", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };

    const app = new Realm.App({ id: "demo_app-cicfi" });

    // Log the user into the backend app.
    // The first time you login, the user must have a network connection.
    const getUser = async () => {
      // Check for an existing user.
      // If the user is offline but credentials are
      // cached, this returns the existing user.
      if (app.currentUser) return app.currentUser;
      // If the device has no cached user credentials, log them in.
      const credentials = Realm.Credentials.anonymous();
      return await app.logIn(credentials);
    };

    // :snippet-start: open-synced-realm-with-background-sync
    const openRealmBehaviorConfig = {
      type: "openImmediately",
    };

    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: await getUser(),
        flexible: true,
        newRealmFileBehavior: openRealmBehaviorConfig,
        existingRealmFileBehavior: openRealmBehaviorConfig,
      },
    };
    // :snippet-end:

    try {
      const realm = await Realm.open(config);

      realm.close();
      expect(realm.isClosed).toBe(true);
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
  });
});

describe("Convert Realm using writeCopyTo()", () => {
  const Car = {
    name: "SportsCar22",
    properties: {
      make: "string",
      model: "string",
      miles: "int",
      _id: "string",
    },
    primaryKey: "_id",
  };
  const app = new Realm.App({ id: "demo_app-cicfi" });
  beforeEach(async () => {
    await app.logIn(Realm.Credentials.anonymous());
  });
  afterEach(async () => {
    if (app.currentUser) {
      await app.deleteUser(app.currentUser);
      await app.currentUser?.logOut();
    }
  });
  test.skip("Open local realm as synced realm with `writeCopyTo()`", async () => {
    // :snippet-start: open-local-as-synced
    const localConfig = {
      schema: [Car],
      path: "localOnly.realm",
    };
    const localRealm = await Realm.open(localConfig);

    const syncedConfig = {
      schema: [Car], // predefined schema
      path: "copyLocalToSynced.realm", // must include in output configuration
      sync: {
        user: app.currentUser, // already logged in user
        partitionValue: "myPartition",
      },
    };
    localRealm.writeCopyTo(syncedConfig);
    const syncedRealm = await Realm.open(syncedConfig);
    // :snippet-end:

    expect(localRealm.isClosed).toBe(false);
    expect(localRealm.isClosed).toBe(false);

    // clean up
    localRealm.close();
    syncedRealm.close();
    Realm.deleteFile(localConfig);
    Realm.deleteFile(syncedConfig);
  });
  test("writing over realm doesn't replace data", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
        _id: "string",
      },
      primaryKey: "_id",
    };
    const realm1Config = { schema: [Car], path: "realm1.realm" };
    const realm1 = await Realm.open(realm1Config);
    realm1.write(() => {
      realm1.create("Car", { _id: "1", model: "Model X", make: "a", miles: 1 });
      realm1.create("Car", { _id: "2", model: "Model Y", make: "a", miles: 1 });
    });
    realm1.close();

    const OtherCar = {
      name: "Car2",
      properties: {
        seats: "int",
        model: "string",
        miles: "int",
        _id: "string",
      },
      primaryKey: "_id",
    };
    const realm2Config = { schema: [Car, OtherCar], path: "realm2.realm" };
    const realm2 = await Realm.open(realm2Config);
    realm2.write(() => {
      realm2.create("Car2", { _id: "3", model: "Model A", miles: 1, seats: 1 });
      realm2.create("Car2", { _id: "4", model: "Model B", miles: 1, seats: 1 });
      realm2.create("Car", { _id: "3", model: "Model A", miles: 1, make: "a" });
      realm2.create("Car", { _id: "4", model: "Model B", miles: 1, make: "a" });
      realm2.create("Car", { _id: "1", model: "Model B", miles: 1, make: "a" });
    });
    realm2.writeCopyTo(realm1Config);

    const combinedRealm = await Realm.open(realm1Config);
    expect(combinedRealm.objectForPrimaryKey("Car", "1").model).toBe("Model B");
    expect(combinedRealm.objects("Car").length).toBe(4);
    expect(() => combinedRealm.objects("Car2")).toThrow(
      "Object type 'Car2' not found in schema."
    );

    // clean up
    realm2.close();
    combinedRealm.close();
    Realm.deleteFile(realm1Config);
    Realm.deleteFile(realm2Config);
  });
  test("sync encrypted to local unencrypted", async () => {
    const Car = {
      name: "SportsCar23",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
        _id: "string",
      },
      primaryKey: "_id",
    };
    await app.logIn(Realm.Credentials.anonymous());
    // :snippet-start: sync-encrypted-to-local-unencrypted
    const encryptionKey = new Int8Array(64); // Create a secure key
    // ... store key ...

    const syncedEncryptedConfig = {
      schema: [Car], // predefined schema
      path: "syncedEncrypted.realm", // must include in output configuration
      sync: {
        user: app.currentUser, // already logged in user
        partitionValue: "myPartition",
      },
      encryptionKey,
    };
    const syncedEncryptedRealm = await Realm.open(syncedEncryptedConfig);

    const localUnencryptedConfig = {
      schema: [Car], // predefined schema
      path: "copyLocalUnencrypted.realm", // must include in output configuration
    };
    syncedEncryptedRealm.writeCopyTo(localUnencryptedConfig);
    const localUnencryptedRealm = await Realm.open(syncedEncryptedConfig);
    // :snippet-end:
    expect(syncedEncryptedRealm.isClosed).toBe(false);
    expect(localUnencryptedRealm.isClosed).toBe(false);

    // clean up
    await syncedEncryptedRealm.syncSession.uploadAllLocalChanges();
    await syncedEncryptedRealm.syncSession.downloadAllServerChanges();
    syncedEncryptedRealm.close();
    localUnencryptedRealm.close();
    Realm.deleteFile(localUnencryptedConfig);
    Realm.deleteFile(syncedEncryptedConfig);
  });
});
