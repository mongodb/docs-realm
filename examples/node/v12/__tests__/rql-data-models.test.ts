import Realm, { BSON } from "realm";
import { Item, Project, Office, Address } from "./models/rql-data-models.ts";

describe("Test RQL Models", () => {
  let realm: Realm;
  const config = { schema: [Project, Item, Office, Address] };

  beforeEach(async () => {
    realm = await Realm.open(config);
  });

  afterEach(() => {
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
    const itemId = new BSON.ObjectId();
    realm.write(() => {
      realm.create(Item, {
        _id: itemId,
        name: "get coffee",
      });
    });
    const coffeeItem = realm.objects(Item)[0];
    expect(coffeeItem._id).toEqual(itemId);
    expect(coffeeItem.name).toBe("get coffee");
    expect(coffeeItem.isComplete).toBe(false);
  });

  test("Can create object of Project type", () => {
    const projectId = new BSON.ObjectId();
    realm.write(() => {
      // Create the tea item
      const teaItem = realm.create("Item", {
        _id: new BSON.ObjectId(),
        name: "get tea",
      });

      // Create the address object
      const address = {
        name: "Main Branch",
        street: "123 Main St",
        zipcode: 10019,
      };

      // Create the office object
      const office = realm.create("Office", {
        name: "Main Office",
        address: address,
      });
      // Create the project object
      realm.create("Project", {
        _id: projectId,
        name: "beverages",
        items: [teaItem],
        projectLocation: office,
      });
    });

    const bevProject = realm.objects(Project)[0];
    expect(bevProject._id).toEqual(projectId);
    expect(bevProject.name).toBe("beverages");
    expect(bevProject.items[0].name).toBe("get tea");
    expect(bevProject.projectLocation?.name).toBe("Main Office");
    expect(bevProject.projectLocation?.address.name).toBe("Main Branch");
  });
});
