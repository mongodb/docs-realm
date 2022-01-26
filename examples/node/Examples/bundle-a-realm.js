import Realm from "realm";
import path from "path";

describe("Bundle a Realm", () => {
  test("Bundle Realm and open it", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };
    // :snippet-start: copy-realm-to-new-file
    const originalPath = path.join(__dirname, "original.realm");
    const originalConfig = {
      schema: [Car],
      path: originalPath,
    };
    const originalRealm = await Realm.open(originalConfig);

    const copyPath = path.join(__dirname, "copy.realm");
    originalRealm.writeCopyTo(copyPath);
    // :snippet-end:

    // :snippet-start: open-bundled-realm
    const copyConfig = {
      schema: [Car],
      path: copyPath, // :remove:
      // :uncomment-start:
      // path: "path/to/bundled/file.realm"
      // :uncomment-end:
    };
    const copyRealm = await Realm.open(copyConfig);
    // :snippet-end:
    expect(copyRealm.isClosed).toBe(false);
    originalRealm.close();
    expect(originalRealm.isClosed).toBe(true);
    expect(copyRealm.isClosed).toBe(false);
    copyRealm.close();
    expect(copyRealm.isClosed).toBe(true);
    // clean up
    Realm.deleteFile(originalConfig);
    Realm.deleteFile(copyConfig);
  });
});
