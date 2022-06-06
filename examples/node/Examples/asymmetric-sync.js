import Realm, { BSON } from "realm";

const app = new Realm.App({ id: "asymmetric-sync-emuon" });

describe("Asymmetric Sync", () => {
  afterEach(async () => {});

  test.skip("define an asymmetric object", async () => {
    console.log("ran this file 'Asymmetric Sync'");
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);

    // :snippet-start: asymmetric-sync
    const InvoiceSchema = {
      name: "Invoice",
      // sync Person objects unidirectionally from your device directly to your Atlas database.
      asymmetric: true,
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        item: "string",
        quantity: "int",
        price: "int",
      },
    };
    // :snippet-end:

    const realm = await Realm.open({
      schema: [InvoiceSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });
    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects("Invoice"), {
        name: "InvoiceSubscription",
      });
    });

    realm.write(() => {
      const invoice1 = realm.create("Invoice", {
        _id: new BSON.ObjectID(),
        item: "shirt",
        quantity: 30,
        price: 10,
      });
    });

    // Clean up
    realm.close();
  });
});

// Using this feature allows you to sync data unidirectionally from your client device directly to your Atlas database.
// Designate the tables from your schema that you would like to sync unidirectionally.
