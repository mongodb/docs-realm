import Realm, { BSON } from "realm";
import { Item, Project, Office, Address } from "./models/rql-data-models.ts";

describe("Test RQL Models", () => {
  let realm;
  const config = { schema: [Project, Item, Office, Address] };

  beforeEach(async () => {
    realm = await Realm.open(config);
  });

  afterEach(() => {
    // After each test, delete the objects and close the realm
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
      realm.close();
      expect(realm.isClosed).toBe(true);
    }
  });

  afterAll(() => {
    Realm.deleteFile(config);
  });

  test("Can open realm with config", async () => {
    expect(realm.isClosed).toBe(false);
  });

  test("Can create object of Item type", () => {
    realm.write(() => {
      realm.create(Item, {
        _id: new BSON.ObjectId(),
        name: "get coffee",
      });
    });
    const coffeeItem = realm.objects(Item)[0];
    expect(coffeeItem._id instanceof BSON.ObjectId).toBe(true);
    expect(coffeeItem.name).toBe("get coffee");
    expect(coffeeItem.isComplete).toBe(false);
  });

  test("Can create object of Project type", () => {
    realm.write(() => {
      const teaItem = realm.create(Item, {
        _id: new BSON.ObjectId(),
        name: "get tea",
      });
      const officeAddress = realm.create(Office, {
        name: "Austin",
        address: {
          name: "Main Branch",
          street: "123 Main St",
          zipcode: 10019,
        },
      });
      realm.create(Project, {
        _id: new BSON.ObjectId(),
        name: "beverages",
        items: [teaItem],
        projectLocation: officeAddress,
      });
    });
    const bevProject = realm.objects(Project)[0];
    expect(bevProject._id instanceof BSON.ObjectId).toBe(true);
    expect(bevProject.name).toBe("beverages");
    expect(bevProject.items[0].name).toBe("get tea");
    expect(bevProject.projectLocation.name).toBe("Austin");
  });
});
