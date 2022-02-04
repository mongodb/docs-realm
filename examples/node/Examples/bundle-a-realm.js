import Realm from "realm";

describe("Bundle a Realm", () => {
  afterEach(() => {
    Realm.deleteFile({ path: "copy.realm" });
    Realm.deleteFile({ path: "original.realm" });
  });
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
    const originalPath = "original.realm";
    const originalConfig = {
      schema: [Car],
      path: originalPath,
    };
    const originalRealm = await Realm.open(originalConfig);

    const copyPath = "copy.realm";
    originalRealm.writeCopyTo(copyPath);
    // :snippet-end:

    // :snippet-start: open-bundled-realm
    const copyConfig = {
      schema: [Car],
      path: copyPath,
    };
    const copyRealm = await Realm.open(copyConfig);
    // :snippet-end:
    expect(copyRealm.isClosed).toBe(false);
    originalRealm.close();
    expect(originalRealm.isClosed).toBe(true);
    expect(copyRealm.isClosed).toBe(false);
    copyRealm.close();
    expect(copyRealm.isClosed).toBe(true);
  });

  test.skip("Must fully sync Realm before bundling", async () => {
    const Car = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
        owner: "string",
      },
    };

    const app = new Realm.App({ id: "demo_app-cicfi" });

    let credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);

    // :snippet-start: fully-sync-before-copy
    const config = {
      sync: {
        user: app.currentUser,
        partitionValue: app.currentUser.id,
      },
      schema: [Car],
    };
    const realm = await Realm.open(config);

    // create many changes
    realm.write(() => {
      for (let i = 0; i < 25; i++) {
        realm.create("Car", {
          make: "Toyota",
          model: "Prius",
          miles: i,
          owner: app.currentUser.id,
        });
      }
    });

    // ensure synchronize all changes before copy
    await realm.syncSession.uploadAllLocalChanges();
    await realm.syncSession.downloadAllServerChanges();

    // changes are synchronized -- we can copy the realm
    realm.writeCopyTo(__dirname + "syncedCopy.realm");
    // :snippet-end:

    // log out the user that created the realm
    await app.currentUser.logOut();
    realm.close();
  });
});
