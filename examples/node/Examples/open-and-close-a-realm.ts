import Realm from "realm";
import { existsSync, rmSync } from "node:fs";
import nock from "nock";

const APP_ID = "js-flexible-oseso";

class Car extends Realm.Object<Car> {
  _id!: Realm.BSON.ObjectId;
  make!: string;
  model!: string;
  miles!: number;

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

describe("LOCAL REALM CONFIGURATIONS", () => {
  beforeEach(() => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("open and close a local realm", async () => {
    // :snippet-start: open-local
    // Open a local realm file with a predefined Car object model
    const realm = await Realm.open({
      schema: [Car],
    });
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    // :snippet-start: close-local-realm
    realm.close();
    // :snippet-end:

    expect(realm.isClosed).toBe(true);
  });

  test("find realm at path", async () => {
    // :snippet-start: find-realm-file
    // Open a realm.
    const realm = await Realm.open({
      schema: [Car],
    });
    expect(realm.isClosed).toBe(false); // :remove:

    // Get on-disk location of the Realm
    const realmFileLocation = realm.path;

    console.log(`Realm file is located at: ${realm.path}`);
    // :snippet-end:

    const parseRealmFilePath = (path: string) =>
      path.substring(path.lastIndexOf("/") + 1);

    expect(parseRealmFilePath(realmFileLocation)).toBe("default.realm");

    realm.close();
  });

  test("open an in memory realm", async () => {
    // :snippet-start: open-in-memory
    const realm = await Realm.open({
      inMemory: true,
      schema: [Car],
    });
    // :snippet-end:

    expect(realm.isClosed).toBe(false);
    //@ts-expect-error TYPEBUG: isInMemory property does not exist.
    expect(realm.isInMemory).toBe(true);

    realm.close();
  });
});

describe("FLEXIBLE SYNC REALM CONFIGURATIONS", () => {
  const app = new Realm.App({ id: "js-flexible-oseso" });

  beforeAll(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();

    await app.logIn(credentials);
  });

  test("open and close a synced realm without internet", async () => {
    await app.currentUser?.logOut();

    // :snippet-start: use-cached-user
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
    // :snippet-end:

    // :snippet-start: open-synced-offline
    const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
      // @ts-expect-error TYPEBUG: enums aren't exposed? :remove:
      type: "openImmediately",
      timeOut: 1000,
      // @ts-expect-error TYPEBUG: enums aren't exposed? :remove:
      timeOutBehavior: "openLocalRealm",
    };

    const config: Realm.Configuration = {
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
    const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
      // @ts-expect-error TYPEBUG: enums aren't exposed? :remove:
      type: "openImmediately",
    };

    const config: Realm.Configuration = {
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

  test("should re-open a realm without providing a schema", () => {
    // :snippet-start: no-schema
    // Open the Realm with a schema
    const realm = new Realm({ schema: [Car] });
    const schemaBefore = realm.schema; // :remove:

    realm.close();

    // Reopen it without a schema
    const reopenedRealm = new Realm();
    // :snippet-end:

    // Expect the schemas to match
    expect(reopenedRealm.schema.length).toBe(1);
    expect(reopenedRealm.schema).toEqual(schemaBefore);
  });
});

describe("PARTITION-BASED SYNC REALM CONFIGURATIONS", () => {
  const app = new Realm.App({ id: "example-testers-kvjdy" });

  beforeAll(async () => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();

    const credentials = Realm.Credentials.anonymous();

    await app.logIn(credentials);
  });

  test("open and close realm", async () => {
    // :snippet-start: open-partition-based
    const config: Realm.Configuration = {
      schema: [Car],
      sync: {
        user: app.currentUser!,
        partitionValue: "myPartition",
      },
    };

    const realm = await Realm.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    realm.close();

    expect(realm.isClosed).toBe(true);
  });
});

describe("CONFIGURE REALM PATHS", () => {
  beforeAll(() => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("open a realm at an absolute path", async () => {
    const customPath = `${__dirname}/testFiles/${new Realm.BSON.UUID().toHexString()}`;

    // Check to make sure the path for the realm doesn't already exist.
    expect(existsSync(customPath)).toBe(false);

    // :snippet-start: set-absolute-path
    const app = new Realm.App({ id: APP_ID, baseFilePath: customPath });
    const user = await app.logIn(Realm.Credentials.anonymous());

    const realm = await Realm.open({
      schema: [Car],
      sync: {
        flexible: true,
        user,
      },
    });
    // :snippet-end:

    // Check that realm exists at absolute path.
    expect(existsSync(customPath)).toBe(true);

    // Check that the realm's path starts with the absolute path.
    expect(realm.path.startsWith(customPath));

    await app.currentUser?.logOut();

    realm.close();

    // Remove realm files that are generated for this test.
    rmSync(customPath, { recursive: true });
  });
});
