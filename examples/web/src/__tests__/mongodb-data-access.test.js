// :snippet-start: import-realm-web
import * as Realm from "realm-web";
// :snippet-end:
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });
const CLUSTER_NAME = "mongodb-atlas";
const DATABASE_NAME = "demo_db";
const COLLECTION_NAME = "plants";

describe("Set up MongoDB Client", () => {
  test("instantiate handle", () => {
    // :snippet-start: instantiate-mongo-client
    const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
    const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
    // :snippet-end:
    // TODO(DOCSP-21091): basic unit test
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
    });
    test("Insert multiple documents", () => {
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
    });
  });
  describe("Read documents", () => {
    test("Find single document", async () => {
      // :snippet-start: find-single-document
      const venusFlytrap = await plants.findOne({ name: "venus flytrap" });
      console.log("venusFlytrap", venusFlytrap);
      // :snippet-end:
    });

    test("Find multiple documents", async () => {
      // :snippet-start: find-multiple-documents
      const perennials = await plants.find({ type: "perennial" });
      console.log("perennials", perennials);
      // :snippet-end:
    });
    test("Count documents in collection", async () => {
      // :snippet-start: count-documents-in-collection
      const numPlants = await plants.count();
      console.log(`There are ${numPlants} plants in the collection`);
      // :snippet-end:
    });
  });
  describe("Update documents", () => {
    test("Update single document", async () => {
      // :snippet-start: update-single-document
      const result = await plants.updateOne(
        { name: "petunia" },
        { $set: { sunlight: "partial" } }
      );
      console.log(result);
      // :snippet-end:
    });

    test("Update multiple documents", async () => {
      // :snippet-start: update-multiple-documents
      const result = await plants.updateMany(
        { _partition: "Store 47" },
        { $set: { _partition: "Store 51" } }
      );
      console.log(result);
      // :snippet-end:
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
        { $set: { name: "sweet basil" } },
        { upsert: true }
      );
      console.log(result);
      // :snippet-end:
    });
  });
  describe("Delete documents", () => {
    test("Delete single document", async () => {
      // :snippet-start: delete-single-document
      const result = await plants.deleteOne({ color: "green" });
      console.log(result);
      // :snippet-end:
    });
    test("Delete multiple documents", async () => {
      // :snippet-start: delete-multiple-documents
      const result = await plants.deleteMany({
        _partition: "Store 51",
      });
      console.log(result);
      // :snippet-end:
    });
  });
});
describe("Watch for changes", () => {
  test("Watch for changes in a collection", async () => {
    // :snippet-start: watch-for-changes
    for await (const change of plants.watch()) {
      switch (change.operationType) {
        case "insert": {
          const { documentKey, fullDocument } = change;
          console.log(`new document: ${documentKey}`, fullDocument);
          break;
        }
        case "update": {
          const { documentKey, fullDocument } = change;
          console.log(`updated document: ${documentKey}`, fullDocument);
          break;
        }
        case "replace": {
          const { documentKey, fullDocument } = change;
          console.log(`replaced document: ${documentKey}`, fullDocument);
          break;
        }
        case "delete": {
          const { documentKey } = change;
          console.log(`deleted document: ${documentKey}`);
          break;
        }
      }
    }

    // :snippet-end:
  });
  test("Watch for changes in a collection with a filter", async () => {
    // :snippet-start: watch-for-changes-with-filter
    for await (const change of plants.watch({
      filter: {
        operationType: "insert",
        "fullDocument.type": "perennial",
      },
    })) {
      // The change event will always represent a newly inserted perennial
      const { documentKey, fullDocument } = change;
      console.log(`new document: ${documentKey}`, fullDocument);
    }

    // :snippet-end:
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
  });
});

// TODO: refactor docs to make aggregation stages examples testable
