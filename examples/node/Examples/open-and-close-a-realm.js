import Realm from "realm";
import nock from "nock";

describe("Open and Close a Realm", () => {
  test("should open and close a local realm", async () => {
    // :code-block-start: open-local-realm-with-car-schema
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

      // :code-block-start: close-local-realm
      realm.close();
      // :code-block-end:

      expect(realm.isClosed).toBe(true); // :remove:
    } catch (err) {
      console.error("Failed to open the realm", err.message);
    }
    // :code-block-end:

    // :code-block-start: open-local-realm-synchronously
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
    // :code-block-end:

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
    // :code-block-start: open-and-close-an-in-memory-realm
    const realm = await Realm.open({
      inMemory: true,
      schema: [Car],
    });
    // :code-block-end:
    expect(realm.inMemory).toBe(true);
    realm.close();
  });

  test.skip("should open and close a synced realm with internet", async () => {
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

    // :code-block-start: open-synced-realm-online-with-car-schema
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
    // :code-block-end:xw
  });

  test.skip("should open and close a sycned realm without internet", async () => {
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

    // :code-block-start: open-synced-realm-offline-with-car-schema
    // :code-block-start: open-synced-realm-config
    const realmFileBehavior = {
      type: "downloadBeforeOpen",
      timeOut: 1000,
      timeOutBehavior: "openLocalRealm",
    };

    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: app.currentUser, // already logged in user
        partitionValue: "myPartition",
        existingRealmFileBehavior: realmFileBehavior,
        newRealmFileBehavior: realmFileBehavior,
      },
    };
    // :code-block-end:
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
    // :code-block-end:

    nock.cleanAll();
    nock.enableNetConnect();
  });

  test.skip("Should open and close a realm with background sync", async () => {
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
    // :code-block-start: open-synced-realm-with-background-sync
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };

    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "myPartition",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // :code-block-end:

    try {
      const realm = await Realm.open(config);

      realm.close();
      expect(realm.isClosed).toBe(true);
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
  });
});
