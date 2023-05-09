import Realm from "realm";
import { existsSync, rmSync } from "node:fs";

const APP_ID = "js-flexible-oseso";

describe("Open realm at different paths", () => {
  const Car = {
    name: "Car",
    properties: {
      _id: "objectId",
      make: "string",
      model: "string",
      miles: "int",
    },
    primaryKey: "_id",
  };

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

  test("should open a realm at a relative path", async () => {
    const customPath = `testFiles`;

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
