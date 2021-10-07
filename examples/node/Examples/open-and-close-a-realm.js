import Realm from "realm";
import nock from "nock";

const Car = {
  name: "Car",
  properties: {
    make: "string",
    model: "string",
    miles: "int",
  },
};

describe("Open and Close a Realm", () => {
  test("should open and close a local realm", async () => {
    let realm;
    // :code-block-start: open-local-realm-with-car-schema
    // Open a local realm file with a particular path & predefined Car schema
    try {
      // :remove-start:
      realm = await Realm.open({
        // :remove-end:
        // :uncomment-start:
        // const realm = await Realm.open({
        // :uncomment-end:
        schema: [Car],
      });
    } catch (err) {
      console.error("Failed to open the realm", err.message);
    }
    // :code-block-end:

    let synchronouslyOpenedRealm;
    // :code-block-start: open-local-realm-synchronously
    // Synchronously open a local realm file with a particular path & predefined Car schema
    try {
      // :remove-start:
      synchronouslyOpenedRealm = new Realm({
        // :remove-end:
        // :uncomment-start:
        // const realm = await Realm.open({
        // :uncomment-end:
        schema: [Car],
      });
    } catch (err) {
      console.error("Failed to open the realm", err.message);
    }
    // :code-block-end:

    // you can test that a realm has been open in general
    // (but not if a realm has been open with a specific path or schema)
    expect(realm).toStrictEqual(synchronouslyOpenedRealm);
    // :code-block-start: close-local-realm
    realm.close();
    // :code-block-end:
    synchronouslyOpenedRealm.close();
    expect(realm.isClosed).toBe(true);
  });

  test.skip("should open and close a synced realm with internet", async () => {
    const app = new Realm.App({ id: "demo_app-cicfi" });

    let user;
    try {
      await app.logIn(new Realm.Credentials.anonymous());
      user = app.currentUser;
    } catch (err) {
      console.error("failed to login user", err.message);
    }

    // :code-block-start: open-synced-realm-online-with-car-schema
    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: user, // already logged in user
        partitionValue: "myPartition",
      },
    };

    let realm; // :remove:
    try {
      realm = await Realm.open(config); // :remove:
      // :uncomment-start:
      // const realm = await Realm.open(config)
      // :uncomment-end:
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
    // :code-block-end:

    realm.close();
    expect(realm.isClosed).toBe(true);
  });

  test.skip("should open and close a sycned realm without internet", async () => {
    const app = new Realm.App({ id: "demo_app-cicfi" });

    let user;
    try {
      await app.logIn(new Realm.Credentials.anonymous());
      user = app.currentUser;
    } catch (err) {
      console.error("failed to login user", err.message);
    }

    // :code-block-start: open-synced-realm-offline-with-car-schema
    // :code-block-start: open-synced-realm-config
    const config = {
      schema: [Car], // predefined schema
      sync: {
        user: user, // already logged in user
        partitionValue: "myPartition",
        existingRealmFileBehavior: {
          type: "openImmediately",
          timeOut: 1000,
          timeOutBehavior: "openLocalRealm",
        },
        newRealmFileBehavior: {
          type: "openImmediately",
          timeOut: 1000,
          timeOutBehavior: "openLocalRealm",
        },
      },
    };
    // :code-block-end:
    // :remove-start:
    nock.disableNetConnect();
    // :remove-end:

    let realm; // :remove:
    try {
      realm = await Realm.open(config); // :remove:
      // :uncomment-start:
      // const realm = await Realm.open(config)
      // :uncomment-end:
      const syncSession = realm.syncSession;
      const connectionState = syncSession.isConnected(); //`false` if offline
    } catch (err) {
      console.error("failed to open realm", err.message);
    }
    // :code-block-end:

    realm.close();
    expect(realm.isClosed).toBe(true);

    nock.cleanAll();
    nock.enableNetConnect();
  });
});
