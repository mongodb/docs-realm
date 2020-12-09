import Realm from "realm";
import BSON from "bson";

const ObjectId = (value: string) => new BSON.ObjectId(value);

// :code-block-start: plant-document-type
type Plant = {
  _id: BSON.ObjectId;
  _partition: string;
  name: string;
  sunlight?: string;
  color?: string;
  type?: string;
};
// :code-block-end:

// prettier-ignore
const PLANTS = [
  // :code-block-start: plants-collection-documents
  { _id: ObjectId("5f87976b7b800b285345a8b4"), name: "venus flytrap", sunlight: "full", color: "white", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b5"), name: "sweet basil", sunlight: "partial", color: "green", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b6"), name: "thai basil", sunlight: "partial", color: "green", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b7"), name: "helianthus", sunlight: "full", color: "yellow", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b8"), name: "petunia", sunlight: "full", color: "purple", type: "annual", _partition: "Store 47" }
  // :code-block-end:
];

const app = Realm.App.getApp("example-testers-kvjdy");

async function getPlantsCollection() {
  if (!app.currentUser) {
    throw new Error("Must be logged in to get plants collection.");
  }
  // :code-block-start: collection-type
  type Document = Realm.Services.MongoDB.Document;
  type MongoDBCollection<
    T extends Document
  > = Realm.Services.MongoDB.MongoDBCollection<T>;
  // :code-block-end:
  // :code-block-start: plants-collection-handle
  const mongodb = app.currentUser.mongoClient(
    "mongodb-atlas"
  );
  const plants = mongodb
    .db("example")
    .collection<Plant>("plants");
  // :code-block-end:
  return plants;
}

beforeAll(async () => {
  const anon = await app.logIn(Realm.Credentials.anonymous());
  const plants = await getPlantsCollection();
  await plants.deleteMany({});
  await plants.insertMany(PLANTS);
  await anon.logOut();
});

beforeEach(async () => {
  await app.logIn(Realm.Credentials.anonymous());
});
afterEach(async () => {
  await app.currentUser?.logOut();
});

describe("Create Documents", () => {
  test("Insert a Single Document", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: insert-a-single-document
    type InsertOneResult = Realm.Services.MongoDB.InsertOneResult<
      BSON.ObjectId
    >;
    const result = await plants.insertOne({
      // :hide-start:
      _id: new BSON.ObjectId("5f879f83fc9013565c23360e"),
      // :hide-end:
      name: "lily of the valley",
      sunlight: "full",
      color: "white",
      type: "perennial",
      _partition: "Store 47",
    });
    console.log(result);
    // :code-block-end:
    expect({ insertedId: result.insertedId.toString() }).toEqual(
      // :code-block-start: insert-a-single-document-result
      {
        insertedId: "5f879f83fc9013565c23360e",
      }
      // :code-block-end:
    );
  });
  test("Insert Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: insert-multiple-documents
    type InsertManyResult = Realm.Services.MongoDB.InsertManyResult<
      BSON.ObjectId
    >;
    const result = await plants.insertMany([
      {
        // :hide-start:
        _id: new BSON.ObjectId("5f87a0defc9013565c233611"),
        // :hide-end:
        name: "rhubarb",
        sunlight: "full",
        color: "red",
        type: "perennial",
        _partition: "Store 47",
      },
      {
        // :hide-start:
        _id: new BSON.ObjectId("5f87a0dffc9013565c233612"),
        // :hide-end:
        name: "wisteria lilac",
        sunlight: "partial",
        color: "purple",
        type: "perennial",
        _partition: "Store 42",
      },
      {
        // :hide-start:
        _id: new BSON.ObjectId("5f87a0dffc9013565c233613"),
        // :hide-end:
        name: "daffodil",
        sunlight: "full",
        color: "yellow",
        type: "perennial",
        _partition: "Store 42",
      },
    ]);
    console.log(result);
    // :code-block-end:
    expect({
      insertedIds: result.insertedIds.map((objectId) => objectId.toString()),
    }).toEqual(
      // :code-block-start: insert-multiple-documents-result
      {
        insertedIds: [
          "5f87a0defc9013565c233611",
          "5f87a0dffc9013565c233612",
          "5f87a0dffc9013565c233613",
        ],
      }
      // :code-block-end:
    );
  });
});

describe("Read Documents", () => {
  test("Find a Single Document", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: find-a-single-document
    const venusFlytrap = await plants.findOne({
      name: "venus flytrap",
    });
    console.log(venusFlytrap);
    // :code-block-end:

    expect(venusFlytrap).toEqual(
      // :code-block-start: find-a-single-document-result
      {
        _id: ObjectId("5f87976b7b800b285345a8b4"),
        name: "venus flytrap",
        sunlight: "full",
        color: "white",
        type: "perennial",
        _partition: "Store 42",
      }
      // :code-block-end:
    );
  });

  test("Find Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: find-multiple-documents
    const perennials = await plants.find({ type: "perennial" });
    console.log(perennials);
    // :code-block-end:

    // prettier-ignore
    expect(perennials).toEqual(
      // :code-block-start: find-multiple-documents-result
      [
        { _id: ObjectId("5f87976b7b800b285345a8b4"), name: 'venus flytrap', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87976b7b800b285345a8b6"), name: 'thai basil', sunlight: 'partial', color: 'green', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f879f83fc9013565c23360e"), name: 'lily of the valley', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0defc9013565c233611"), name: 'rhubarb', sunlight: 'full', color: 'red', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0dffc9013565c233612"), name: 'wisteria lilac', sunlight: 'partial', color: 'purple', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87a0dffc9013565c233613"), name: 'daffodil', sunlight: 'full', color: 'yellow', type: 'perennial', _partition: 'Store 42' }
      ]
      // :code-block-end:
    );
  });

  test("Count Documents in the Collection", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: count-documents-in-the-collection
    const numPlants = await plants.count();
    console.log(`There are ${numPlants} plants in the collection`);
    // :code-block-end:

    expect(`There are ${numPlants} plants in the collection`).toEqual(
      // :code-block-start: count-documents-in-the-collection-result
      "There are 9 plants in the collection"
      // :code-block-end:
    );
  });
});

describe("Update Documents", () => {
  test("Update a Single Document", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: update-a-single-document
    type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
    const result = await plants.updateOne(
      { name: "petunia" },
      { $set: { sunlight: "partial" } }
    );
    console.log(result);
    // :code-block-end:

    expect(result).toEqual(
      // :code-block-start: update-a-single-document-result
      { matchedCount: 1, modifiedCount: 1 }
      // :code-block-end:
    );
  });

  test("Update Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: update-multiple-documents
    type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
    const result = await plants.updateMany(
      { _partition: "Store 47" },
      { $set: { _partition: "Store 51" } }
    );
    console.log(result);
    // :code-block-end:

    expect(result).toEqual(
      // :code-block-start: update-multiple-documents-result
      { matchedCount: 3, modifiedCount: 3 }
      // :code-block-end:
    );
  });
  test("Upsert Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: upsert-documents
    type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
    const result = await plants.updateOne(
      {
        // :hide-start:
        _id: new BSON.ObjectId("5f1f63055512f2cb67f460a3"),
        // :hide-end:
        sunlight: "full",
        type: "perennial",
        color: "green",
        _partition: "Store 47",
      },
      { $set: { name: "sweet basil" } },
      { upsert: true }
    );
    console.log(result);
    // :code-block-end:

    expect(result).toEqual(
      // :code-block-start: upsert-documents-result
      {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedId: ObjectId("5f1f63055512f2cb67f460a3"),
      }
      // :code-block-end:
    );
  });
});

describe("Delete Documents", () => {
  test("Delete a Single Document", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: delete-a-single-document
    const result = await plants.deleteOne({
      color: "green",
    });
    console.log(result);
    // :code-block-end:

    expect(result).toEqual(
      // :code-block-start: delete-a-single-document-result
      { deletedCount: 1 }
      // :code-block-end:
    );
  });
  test("Delete Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: delete-multiple-documents
    const result = await plants.deleteMany(
      {
        _partition: "Store 51",
      }
    );
    console.log(result);
    // :code-block-end:

    expect(result).toEqual(
      // :code-block-start: delete-multiple-documents-result
      { deletedCount: 3 }
      // :code-block-end:
    );
  });
});

describe("Aggregate Documents", () => {
  test("Aggregate Documents in a Collection", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: aggregate-documents-in-a-collection
    type GroupedByType = {
      _id: "annual" | "perennial";
      total: number;
    };
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
    // :code-block-end:
    expect(result).toEqual(
      // :code-block-start: aggregate-documents-in-a-collection-result
      [
        { _id: "annual", total: 1 },
        { _id: "perennial", total: 5 },
      ]
      // :code-block-end:
    );
  });
});

describe("Aggregation Stages", () => {
  test("Filter Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: filter-documents
    const perennials = await plants.aggregate([
      { $match: { type: { $eq: "perennial" } } },
    ]);
    console.log(perennials);
    // :code-block-end:
    perennials.forEach((plant: Plant) => {
      expect(plant.type).toEqual("perennial");
    });
    // prettier-ignore
    expect(perennials).toEqual(
      // :code-block-start: filter-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "sunlight": "full", "type": "perennial" }
      ]
      // :code-block-end:
    )
  });

  test("Group Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: group-documents
    type GroupedByType = {
      _id: "annual" | "perennial";
      numItems: number;
    };
    const result = await plants.aggregate([
      {
        $group: {
          _id: "$type",
          numItems: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(result);
    // :code-block-end:
    expect(result).toEqual(
      // :code-block-start: group-documents-result
      [
        { _id: "annual", numItems: 1 },
        { _id: "perennial", numItems: 5 },
      ]
      // :code-block-end
    );
  });

  test("Project Document Fields", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: project-document-fields
    const result = await plants.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          storeNumber: {
            $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
          },
        },
      },
    ]);
    console.log(result);
    // :code-block-end:
    // prettier-ignore
    expect(result).toEqual(
      // :code-block-start: project-document-fields-result
      [
        { "name": "venus flytrap", "storeNumber": "42" },
        { "name": "thai basil", "storeNumber": "42" },
        { "name": "helianthus", "storeNumber": "42" },
        { "name": "wisteria lilac", "storeNumber": "42" },
        { "name": "daffodil", "storeNumber": "42" },
        { "name": "sweet basil", "storeNumber": "47" }
      ]
      // :code-block-end
    )
  });
  test("Add Fields to Documents", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: add-fields-to-documents
    const result = await plants.aggregate([
      {
        $addFields: {
          storeNumber: {
            $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
          },
        },
      },
    ]);
    console.log(result);
    // :code-block-end:
    // prettier-ignore
    expect(result).toEqual(
      // :code-block-start: add-fields-to-documents-result
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b7"), "_partition": "Store 42", "color": "yellow", "name": "helianthus", "storeNumber": "42", "sunlight": "full", "type": "annual" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "storeNumber": "47", "sunlight": "full", "type": "perennial" }
      ]
      // :code-block-end
    )
  });
  test("Unwind Array Values", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: unwind-array-values
    const result = await plants.aggregate([
      { $group: { _id: "$type", colors: { $addToSet: "$color" } } },
      { $unwind: { path: "$colors" } },
      { $sort: { _id: 1, colors: 1 } },
    ]);
    console.log(result);
    // :code-block-end:
    // prettier-ignore
    expect(result).toEqual(
      // :code-block-start: unwind-array-values-result
      [
        { "_id": "annual", "colors": "yellow" },
        { "_id": "perennial", "colors": "green" },
        { "_id": "perennial", "colors": "purple" },
        { "_id": "perennial", "colors": "white" },
        { "_id": "perennial", "colors": "yellow" },
      ]
      // :code-block-end:
    )
  });
});

describe("Watch for Changes", () => {
  test("Watch for Changes in a Collection", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: watch-a-collection
    // :hide-start:
    try {
      const watching = plants.watch();
      const next = watching.next();
      jest.runOnlyPendingTimers();
      await next;
    } catch (err) {
      expect(err).toEqual({
        type: "aborted",
        message: "The user aborted a request.",
      });
    }
    expect.assertions(1);
    return;
    // :replace-with:
    for await (const change of plants.watch()) {
      const { operationType } = change;
      switch (operationType) {
        case "insert": {
          const {
            documentKey,
            fullDocument,
          } = change as Realm.Services.MongoDB.InsertEvent<Plant>;
          console.log(`new document with _id: ${documentKey}`, fullDocument);
          break;
        }
        case "update": {
          const {
            documentKey,
            fullDocument,
          } = change as Realm.Services.MongoDB.UpdateEvent<Plant>;
          console.log(`updated document: ${documentKey}`, fullDocument);
          break;
        }
        case "replace": {
          const {
            documentKey,
            fullDocument,
          } = change as Realm.Services.MongoDB.ReplaceEvent<Plant>;
          console.log(`replaced document: ${documentKey}`, fullDocument);
          break;
        }
        case "delete": {
          const { documentKey } = change as Realm.Services.MongoDB.DeleteEvent<
            Plant
          >;
          console.log(`deleted document: ${documentKey}`);
          break;
        }
      }
    }
    // :hide-end:
    // :code-block-end:
  });

  test("Watch for Changes in a Collection with a Filter", async () => {
    const plants = await getPlantsCollection();
    // :code-block-start: watch-a-collection-with-filter
    // :hide-start:
    try {
      const watching = plants.watch({
        operationType: "insert",
        "fullDocument.type": "perennial",
      });
      const next = watching.next();
      jest.runOnlyPendingTimers();
      await next;
    } catch (err) {
      expect(err).toEqual({
        type: "aborted",
        message: "The user aborted a request.",
      });
    }
    expect.assertions(1);
    return;
    // :replace-with:
    for await (const change of plants.watch({
      operationType: "insert",
      "fullDocument.type": "perennial",
    })) {
      // The change event will always represent a newly inserted perennial
      const {
        documentKey,
        fullDocument,
      } = change as Realm.Services.MongoDB.InsertEvent<Plant>;
      console.log(`new document: ${documentKey}`, fullDocument);
    }
    // :hide-end:
    // :code-block-end:
  });
});
