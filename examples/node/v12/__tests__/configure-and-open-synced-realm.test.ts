import Realm from "realm";

describe("Configure & Open a Synced Realm", () => {
  test("test cancelWaitsOnNonFatalError is valid config", async () => {
    const DoggieSchema: Realm.ObjectSchema = {
      name: "Doggie",
      properties: {
        _id: {
          type: "objectId",
        },
        name: {
          type: "string",
        },
        age: {
          type: "int",
          optional: true,
        },
        owner_id: {
          type: "string",
        },
      },
      primaryKey: "_id",
    };

    // The PR that adds this functionality to the JS SDK is:
    // https://github.com/realm/realm-js/pull/5494
    // The engineer comments on the reasons this is difficult to test,
    // and has tested it manually. Here, I'm only verifying that these
    // config settings are valid and that I can write and delete objects.
    // This can be tested properly when this open PR issue is addressed:
    // https://github.com/realm/realm-js/issues/5509

    const appId = "js-flexible-oseso";

    // :snippet-start: app-config-with-timeout
    const app = new Realm.App({
      id: appId,
      // You can optionally specify a timeout in milliseconds
      timeout: 10000,
    });
    // :snippet-end:

    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);

    // :snippet-start: cancel-waits-on-non-fatal-error
    const config: Realm.Configuration = {
      schema: [DoggieSchema],
      sync: {
        flexible: true,
        user: app.currentUser!,
        // When `true`, upload and download waits are canceled on any
        // error, such as a timeout, instead of just a fatal error.
        cancelWaitsOnNonFatalError: true,
      },
    };
    // :snippet-end:

    const realm = await Realm.open(config);

    const dogs = realm.objects("Doggie");

    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(dogs, {
        name: "testDoggies",
      });
    });

    // :snippet-start: wait-for-download
    await realm.syncSession?.downloadAllServerChanges();
    // :snippet-end:

    expect(dogs.length).toBe(0);

    // :snippet-start: wait-for-upload
    realm.write(() => {
      realm.create(`Doggie`, {
        _id: new Realm.BSON.ObjectID(),
        owner_id: app.currentUser!.id,
        name: "Maui",
        age: 3,
      });
    });

    await realm.syncSession?.uploadAllLocalChanges();
    // :snippet-end:

    const dogsAfterWrite = realm.objects("Doggie");
    expect(dogsAfterWrite.length).toBe(1);

    realm.write(() => {
      realm.delete(realm.objects("Doggie"));
    });

    await realm.syncSession?.uploadAllLocalChanges();

    const dogsAfterDelete = realm.objects("Doggie");
    expect(dogsAfterDelete.length).toBe(0);
  }, 30000);
});
