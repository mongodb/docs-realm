import Realm from "realm";
import { existsSync, rmSync } from "node:fs";

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

describe("CONFIGURE A REALM", () => {
  beforeEach(() => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("should open and close a local realm", async () => {
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

  test("should find realm at path", async () => {
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
});

describe("CONFIGURE REALM PATHS", () => {
  beforeAll(() => {
    // Close and remove all realms in the default directory.
    Realm.clearTestState();
  });

  test("should open a realm at an absolute path", async () => {
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
