import Realm from "realm";
import BSON from "bson";

// const alphabetized = (fieldName, arr) =>
//   arr.sort((l, r) => (l[fieldName][0] < r[fieldName][0] ? -1 : 1));
const ObjectId = (value) => new BSON.ObjectId(value);

// prettier-ignore
const PLANTS = [
  { _id: ObjectId("5f87976b7b800b285345a8b4"), name: "venus flytrap", sunlight: "full", color: "white", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b5"), name: "sweet basil", sunlight: "partial", color: "green", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b6"), name: "thai basil", sunlight: "partial", color: "green", type: "perennial", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b7"), name: "helianthus", sunlight: "full", color: "yellow", type: "annual", _partition: "Store 42" },
  { _id: ObjectId("5f87976b7b800b285345a8b8"), name: "petunia", sunlight: "full", color: "purple", type: "annual", _partition: "Store 47" }
];

let app;

async function getPlantsCollection() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const plants = mongodb.db("example").collection("plants");
  return plants;
}

beforeAll(async () => {
  app = new Realm.App({ id: "example-testers-kvjdy" });
  await app.logIn(Realm.Credentials.anonymous());
  const plants = await getPlantsCollection();
  await plants.deleteMany({});
  await plants.insertMany(PLANTS);
});

afterAll(async () => {
  await app.currentUser?.logOut();
});

describe("Create Documents", () => {
  test("Insert a Single Document", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.insertOne({
      name: "lily of the valley",
      sunlight: "full",
      color: "white",
      type: "perennial",
      _partition: "Store 47",
    });
    console.log(result);
    expect({ insertedId: result.insertedId.toString() }).toEqual(
      {
        insertedId: "5f879f83fc9013565c23360e",
      }
    );
  });
  test("Insert Multiple Documents", async () => {
    const plants = await getPlantsCollection();
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
    expect({
      insertedIds: result.insertedIds.map((objectId) => objectId.toString()),
    }).toEqual(
      {
        insertedIds: [
          "5f87a0defc9013565c233611",
          "5f87a0dffc9013565c233612",
          "5f87a0dffc9013565c233613",
        ],
      }
    );
  });
});

describe("Read Documents", () => {
  test("Find a Single Document", async () => {
    const plants = await getPlantsCollection();
    const venusFlytrap = await plants.findOne({ name: "venus flytrap" });
    console.log("venusFlytrap", venusFlytrap);

    expect(venusFlytrap).toEqual(
      {
        _id: ObjectId("5f87976b7b800b285345a8b4"),
        name: "venus flytrap",
        sunlight: "full",
        color: "white",
        type: "perennial",
        _partition: "Store 42",
      }
    );
  });

  test("Find Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    const perennials = await plants.find({ type: "perennial" });
    console.log("perennials", perennials);

    // prettier-ignore
    expect(perennials).toEqual(
      [
        { _id: ObjectId("5f87976b7b800b285345a8b4"), name: 'venus flytrap', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87976b7b800b285345a8b6"), name: 'thai basil', sunlight: 'partial', color: 'green', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f879f83fc9013565c23360e"), name: 'lily of the valley', sunlight: 'full', color: 'white', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0defc9013565c233611"), name: 'rhubarb', sunlight: 'full', color: 'red', type: 'perennial', _partition: 'Store 47' },
        { _id: ObjectId("5f87a0dffc9013565c233612"), name: 'wisteria lilac', sunlight: 'partial', color: 'purple', type: 'perennial', _partition: 'Store 42' },
        { _id: ObjectId("5f87a0dffc9013565c233613"), name: 'daffodil', sunlight: 'full', color: 'yellow', type: 'perennial', _partition: 'Store 42' }
      ]
    );
  });

  test("Count Documents in the Collection", async () => {
    const plants = await getPlantsCollection();
    const numPlants = await plants.count();
    console.log(`There are ${numPlants} plants in the collection`);

    expect(`There are ${numPlants} plants in the collection`).toEqual(
      "There are 9 plants in the collection"
    );
  });
});

describe("Update Documents", () => {
  test("Update a Single Document", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.updateOne(
      { name: "petunia" },
      { $set: { sunlight: "partial" } }
    );
    console.log(result);

    expect(result).toEqual(
      { matchedCount: 1, modifiedCount: 1 }
    );
  });

  test("Update Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.updateMany(
      { _partition: "Store 47" },
      { $set: { _partition: "Store 51" } }
    );
    console.log(result);

    expect(result).toEqual(
      { matchedCount: 3, modifiedCount: 3 }
    );
  });
  test("Upsert Documents", async () => {
    const plants = await getPlantsCollection();
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

    expect(result).toEqual(
      {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedId: ObjectId("5f1f63055512f2cb67f460a3"),
      }
    );
  });
});
describe("Delete Documents", () => {
  test("Delete a Single Document", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.deleteOne({ color: "green" });
    console.log(result);

    expect(result).toEqual(
      { deletedCount: 1 }
    );
  });
  test("Delete Multiple Documents", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.deleteMany({
      _partition: "Store 51",
    });
    console.log(result);

    expect(result).toEqual(
      { deletedCount: 3 }
    );
  });
});

describe("Aggregate Documents", () => {
  test("Aggregate Documents in a Collection", async () => {
    const plants = await getPlantsCollection();
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
    expect(result).toEqual(
      [
        { _id: "annual", total: 1 },
        { _id: "perennial", total: 5 },
      ]
    );
  });
});

describe("Aggregation Stages", () => {
  test("Filter Documents", async () => {
    const plants = await getPlantsCollection();
    const perennials = await plants.aggregate([
      { $match: { type: { $eq: "perennial" } } },
    ]);
    console.log(perennials);
    perennials.forEach((plant) => {
      expect(plant.type).toEqual("perennial");
    });
    // prettier-ignore
    expect(perennials).toEqual(
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "sunlight": "full", "type": "perennial" }
      ]
    )
  });

  test("Group Documents", async () => {
    const plants = await getPlantsCollection();
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
    expect(result).toEqual(
      [
        { _id: "annual", numItems: 1 },
        { _id: "perennial", numItems: 5 },
      ]
      // :code-block-end
    );
  });

  test("Project Document Fields", async () => {
    const plants = await getPlantsCollection();
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
    // prettier-ignore
    expect(result).toEqual(
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
    // prettier-ignore
    expect(result).toEqual(
      [
        { "_id": ObjectId("5f87976b7b800b285345a8b4"), "_partition": "Store 42", "color": "white", "name": "venus flytrap", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b6"), "_partition": "Store 42", "color": "green", "name": "thai basil", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87976b7b800b285345a8b7"), "_partition": "Store 42", "color": "yellow", "name": "helianthus", "storeNumber": "42", "sunlight": "full", "type": "annual" },
        { "_id": ObjectId("5f87a0dffc9013565c233612"), "_partition": "Store 42", "color": "purple", "name": "wisteria lilac", "storeNumber": "42", "sunlight": "partial", "type": "perennial" },
        { "_id": ObjectId("5f87a0dffc9013565c233613"), "_partition": "Store 42", "color": "yellow", "name": "daffodil", "storeNumber": "42", "sunlight": "full", "type": "perennial" },
        { "_id": ObjectId("5f1f63055512f2cb67f460a3"), "_partition": "Store 47", "color": "green", "name": "sweet basil", "storeNumber": "47", "sunlight": "full", "type": "perennial" }
      ]
    )
  });
  test("Unwind Array Values", async () => {
    const plants = await getPlantsCollection();
    const result = await plants.aggregate([
      { $group: { _id: "$type", colors: { $addToSet: "$color" } } },
      { $unwind: { path: "$colors" } },
      { $sort: { _id: 1, colors: 1 } },
    ]);
    console.log(result);
    // prettier-ignore
    expect(result).toEqual(
      [
        { "_id": "annual", "colors": "yellow" },
        { "_id": "perennial", "colors": "green" },
        { "_id": "perennial", "colors": "purple" },
        { "_id": "perennial", "colors": "white" },
        { "_id": "perennial", "colors": "yellow" },
      ]
    )
  });
});

describe("Watch for Changes", () => {
  test("Watch for Changes in a Collection", async () => {
    const plants = await getPlantsCollection();
    r await (const change of plants.watch()) {
    const { operationType } = change;
    switch (operationType) {
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
      /* eslint-enable no-unreachable */
    }
  });

  test("Watch for Changes in a Collection with a Filter", async () => {
    const plants = await getPlantsCollection();
    r await (const change of plants.watch({
    operationType: "insert",
    "fullDocument.type": "perennial",
    ) {
    // The change event will always represent a newly inserted perennial
    const { documentKey, fullDocument } = change;
    console.log(`new document: ${documentKey}`, fullDocument);
    
    /* eslint-enable no-unreachable */
  });
});
