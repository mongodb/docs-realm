// :snippet-start: import-realm-web
import * as Realm from "realm-web";
// :snippet-end:
import { APP_ID } from "../realm.config.json";
const {
  BSON: { ObjectId },
} = Realm;

const app = new Realm.App({ id: APP_ID });
const CLUSTER_NAME = "mongodb-atlas";
const DATABASE_NAME = "demo_db";
const COLLECTION_NAME = "plants";

const sampleData = [
  {
    _id: ObjectId("5f87976b7b800b285345a8b4"),
    name: "venus flytrap",
    sunlight: "full",
    color: "white",
    type: "perennial",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b5"),
    name: "sweet basil",
    sunlight: "partial",
    color: "green",
    type: "annual",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b6"),
    name: "thai basil",
    sunlight: "partial",
    color: "green",
    type: "perennial",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b7"),
    name: "helianthus",
    sunlight: "full",
    color: "yellow",
    type: "annual",
    _partition: "Store 42",
  },
  {
    _id: ObjectId("5f87976b7b800b285345a8b8"),
    name: "petunia",
    sunlight: "full",
    color: "purple",
    type: "annual",
    _partition: "Store 47",
  },
];
let plants;
beforeAll(async () => {
  await app.logIn(Realm.Credentials.anonymous());
  // :snippet-start: instantiate-mongo-client
  const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
  const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
  // :snippet-end:
  plants = collection;
  await plants.insertMany(sampleData);
});

afterAll(async () => {
  await plants.deleteMany({});
  await app.deleteUser(app.currentUser);
});

describe("Set up MongoDB Client", () => {
  test("instantiate handle", async () => {
    const plant = await plants.findOne({});
    expect(plant._id instanceof ObjectId).toBe(true);
    expect(typeof plant.name).toBe("string");
  });
});

// TODO(DOCSP-21091): turn into actual tests
describe("CRUD operations", () => {
  describe("Create documents", () => {
    test("Insert single document", async () => {
      // :snippet-start: insert-single-document
      const result = await plants.insertOne({
        name: "lily of the valley",
        sunlight: "full",
        color: "white",
        type: "perennial",
        _partition: "Store 47",
      });
      console.log(result);
      // :snippet-end:
      expect(result.insertedId instanceof ObjectId).toBe(true);
    });
    test("Insert multiple documents", async () => {
      // :snippet-start: insert-multiple-documents
      const result = await plants.insertMany([
        {
          name: "rhubarb",
          sunlight: "full",
          color: "red",
          type: "perennial",
          _partition: "Store 47",
        },
        {
          name: "wisteria lilac",
          sunlight: "partial",
          color: "purple",
          type: "perennial",
          _partition: "Store 42",
        },
        {
          name: "daffodil",
          sunlight: "full",
          color: "yellow",
          type: "perennial",
          _partition: "Store 42",
        },
      ]);
      console.log(result);
      // :snippet-end:
      expect(result.insertedIds.length).toBe(3);
      expect(result.insertedIds[0] instanceof ObjectId).toBe(true);
    });
  });
  describe("Read documents", () => {
    test("Find single document", async () => {
      // :snippet-start: find-single-document
      const venusFlytrap = await plants.findOne({ name: "venus flytrap" });
      console.log("venusFlytrap", venusFlytrap);
      // :snippet-end:
      expect(venusFlytrap._id instanceof ObjectId).toBe(true);
      expect(venusFlytrap.name).toBe("venus flytrap");
      expect(venusFlytrap.color).toBe("white");
    });

    test("Find multiple documents", async () => {
      // :snippet-start: find-multiple-documents
      const perennials = await plants.find({ type: "perennial" });
      console.log("perennials", perennials);
      // :snippet-end:
      expect(perennials.length > 1).toBe(true);
    });
    test("Count documents in collection", async () => {
      // :snippet-start: count-documents-in-collection
      const numPlants = await plants.count();
      console.log(`There are ${numPlants} plants in the collection`);
      // :snippet-end:
      expect(typeof numPlants).toBe("number");
      expect(numPlants >= 0).toBe(true);
    });
  });
  describe("Update documents", () => {
    test("Update single document", async () => {
      const petuniaBefore = await plants.findOne({ name: "petunia" });
      expect(petuniaBefore.sunlight).toBe("full");
      // :snippet-start: update-single-document
      const result = await plants.updateOne(
        { name: "petunia" },
        { $set: { sunlight: "partial" } }
      );
      console.log(result);
      // :snippet-end:
      expect(result.matchedCount).toBe(1);
      expect(result.modifiedCount).toBe(1);
      const petunia = await plants.findOne({ name: "petunia" });
      expect(petunia.sunlight).toBe("partial");
    });

    test("Update multiple documents", async () => {
      // :snippet-start: update-multiple-documents
      const result = await plants.updateMany(
        { _partition: "Store 47" },
        { $set: { _partition: "Store 51" } }
      );
      console.log(result);
      // :snippet-end:
      expect(result.matchedCount).toBe(3);
      expect(result.modifiedCount).toBe(3);
      const store47After = await plants.find({ _partition: "Store 47" });
      expect(store47After.length).toBe(0);
      const store51After = await plants.find({ _partition: "Store 51" });
      expect(store51After.length).toBe(3);
    });
    test("Upsert documents", async () => {
      // :snippet-start: upsert-documents
      const result = await plants.updateOne(
        {
          sunlight: "full",
          type: "perennial",
          color: "green",
          _partition: "Store 47",
        },
        { $set: { name: "super sweet basil" } },
        { upsert: true }
      );
      console.log(result);
      // :snippet-end:
      expect(result.matchedCount).toBe(0);
      expect(result.modifiedCount).toBe(0);
      expect(result.upsertedId instanceof ObjectId).toBe(true);
    });
  });
  describe("Delete documents", () => {
    test("Delete single document", async () => {
      const countBefore = await plants.count();
      // :snippet-start: delete-single-document
      const result = await plants.deleteOne({ color: "green" });
      console.log(result);
      // :snippet-end:
      const countAfter = await plants.count();
      expect(countBefore - countAfter).toBe(1);
      expect(result.deletedCount).toBe(1);
    });
    test("Delete multiple documents", async () => {
      const countBefore = await plants.count();
      // :snippet-start: delete-multiple-documents
      const result = await plants.deleteMany({
        _partition: "Store 51",
      });
      console.log(result);
      // :snippet-end:
      const countAfter = await plants.count();
      expect(result.deletedCount).toBe(3);
      expect(countBefore - countAfter).toBe(3);
    });
  });
});
describe("Watch for changes", () => {
  const sleep = async (time) =>
    new Promise((resolve) => setTimeout(resolve, time));
  test("Watch for changes in a collection", async () => {
    await Promise.all([
      (async () => {
        sleep(500);
        plants.insertOne({
          _id: ObjectId(),
          name: "delphinium",
          sunlight: "full",
          color: "purple",
          type: "perennial",
          _partition: "Store 23",
        });
      })(),
      (async () => {
        // :snippet-start: watch-for-changes
        for await (const change of plants.watch()) {
          let breakAsyncIterator = false;
          // :remove-start:
          expect(change.operationType).toBe("insert");
          expect(change.fullDocument.name).toBe("delphinium");
          // :remove-end:
          switch (change.operationType) {
            case "insert": {
              const { documentKey, fullDocument } = change;
              console.log(`new document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "update": {
              const { documentKey, fullDocument } = change;
              console.log(`updated document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "replace": {
              const { documentKey, fullDocument } = change;
              console.log(`replaced document: ${documentKey}`, fullDocument);
              breakAsyncIterator = true;
              break;
            }
            case "delete": {
              const { documentKey } = change;
              console.log(`deleted document: ${documentKey}`);
              breakAsyncIterator = true;
              break;
            }
          }
          if (breakAsyncIterator) break;
        }
        // :snippet-end:
      })(),
    ]);
  });
  test("Watch for changes in a collection with a filter", async () => {
    await Promise.all([
      (async () => {
        sleep(500);
        const perennial = await plants.findOne({ type: "perennial" });
        console.log(perennial);
        await plants.updateOne(
          { _id: perennial._id },
          {
            $set: { name: "daisy" },
          }
        );
      })(),
      (async () => {
        // :snippet-start: watch-for-changes-with-filter
        for await (const change of plants.watch({
          filter: {
            operationType: "update",
            "fullDocument.type": "perennial",
          },
        })) {
          // The change event will always represent a newly inserted perennial
          const { documentKey, fullDocument } = change;
          console.log(`new document: ${documentKey}`, fullDocument);
          expect(fullDocument.name).toBe("daisy"); // :remove:
          break; // Exit async iterator
        }
        // :snippet-end:
      })(),
    ]);
  });
});

describe("Aggregate documents", () => {
  test("Basic aggregation", async () => {
    // :snippet-start: basic-aggregation
    const result = await plants.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(result);
    // :snippet-end:
    const [annual, perennial] = result;
    expect(annual._id).toBe("annual");
    expect(annual.total).toBe(1);
    expect(perennial._id).toBe("perennial");
    expect(perennial.total).toBe(6);
  });
});
// TODO: refactor docs to make aggregation stages examples testable
