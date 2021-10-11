import Realm from "realm";
import nock from "nock";

// :code-block-start: open-local-realm-with-car-schema
const Car = {
  name: "Car",
  properties: {
    make: "string",
    model: "string",
    miles: "int",
  },
};
// :remove-start:
describe("Open and Close a Realm", () => {
  test("should open and close a local realm", async () => {
    let realm;
    // :remove-end:
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

    // You can test whether a realm has been opened in general
    // (but not if a realm has been opened with a specific path or schema)
    expect(realm).toStrictEqual(synchronouslyOpenedRealm);
    // :code-block-start: close-local-realm
    realm.close();
    // :code-block-end:
    synchronouslyOpenedRealm.close();
    expect(realm.isClosed).toBe(true);
  });

  test.skip("should open and close a synced realm with internet", async () => {
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

    try {
      await app.logIn(new Realm.Credentials.anonymous());
    } catch (err) {
      console.error("failed to login user", err.message);
    }

    // :code-block-start: open-synced-realm-offline-with-car-schema
    // :code-block-start: open-synced-realm-config
    const realmFileBehavior = {
      type: "openImmediately",
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
