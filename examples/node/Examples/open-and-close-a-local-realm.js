import Realm from "realm";

const CarSchema = {
  name: "Car",
  properties: {
    make: "string",
    model: "string",
    miles: "int",
  },
};

describe("Open and Close a Local Realm", () => {
  test("should open and close a local realm", async () => {
    // :code-block-start: open-local-realm-with-car-schema
    // Open a local realm file with a particular path & predefined CarSchema
    const realm = await Realm.open({
      path: "myrealm",
      schema: [CarSchema],
    });
    // :code-block-end:

    // :code-block-start: open-local-realm-synchronously
    // :replace-start: {
    //   "terms": {
    //     "synchronouslyOpenedRealm": "realm"
    //   }
    // }
    // Synchronously open a local realm file with a particular path & predefined CarSchema
    const synchronouslyOpenedRealm = new Realm({
      path: "myrealm",
      schema: [CarSchema],
    });
    // :replace-end:
    // :code-block-end:

    // you can test that a realm has been open in general (but not if a realm has been open with a specific path or schema)
    expect(realm).toStrictEqual(synchronouslyOpenedRealm);
    // :code-block-start: close-local-realm
    realm.close();
    // :code-block-end:
    expect(realm.isClosed).toBe(true);
  });
});
