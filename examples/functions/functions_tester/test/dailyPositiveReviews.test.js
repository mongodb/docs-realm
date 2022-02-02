const dailyPositiveReviews = require("../functions/dailyPositiveReviews");
const { MongoClient } = require("mongodb");
const { ObjectID } = require("bson");

let db = null;
let client = null;
const uri = "mongodb://localhost:27017/dailyPositiveReviewTestDb";

global.context = {
  services: {
    get: getService,
  },
};
function getService(serviceName) {
  console.log("hello");
  switch (serviceName) {
    case "mongodb-atlas":
      return db;
    default:
      return null;
  }
}

async function createDB(name) {
  try {
    client = new MongoClient(uri);
    await client.connect();
    const database = client.db(name);
    return database;
  } catch (err) {
    console.error(err);
  }
}

async function tearDownDb() {
  db.dropDatabase();
  client.close();
}

describe("testing dailyPositiveReviews Realm Function", () => {
  beforeAll(async () => {
    try {
      db = await createDB("ExampleDb");
    } catch (err) {
      console.error(err);
    }
  });
  afterEach(async () => {
    try {
      await db.collection("reviews").drop();
    } catch (err) {
      console.error(err);
    }
  });
  afterAll(async () => {
    try {
      await tearDownDb();
    } catch (err) {
      console.error(err);
    }
  });
  test("function runs", async () => {
    const reviews = db.collection("reviews");
    const midnightToday = getMidnightTodayInt();
    // const midnightYesterday = getMidnightYesterdayInt();
    const yesterdayReview = createReview(
      new ObjectID(),
      new ObjectID(),
      new ObjectID(),
      4,
      "great stuff",
      midnightToday - 1000
    );
    const todayReview = createReview(
      new ObjectID(),
      new ObjectID(),
      new ObjectID(),
      4,
      "great stuff",
      midnightToday + 1000
    );
    reviews.insertMany([todayReview, yesterdayReview]);
    const res = await dailyPositiveReviews();
    expect(res.length).toBe(2);
  });
});

function createReview(
  _id,
  userId,
  productId,
  rating,
  comment,
  createdAtTimestamp
) {
  return { _id, userId, productId, rating, comment, createdAtTimestamp };
}
function getMidnightTodayInt() {
  let midnightToday = new Date();
  midnightToday.setHours(0, 0, 0, 0);
  midnightToday = midnightToday.getTime();
  return midnightToday;
}

function getMidnightYesterdayInt() {
  let midnightYesterday = new Date();
  midnightYesterday.setDate(midnightYesterday.getDate() - 1);
  midnightYesterday.setHours(0, 0, 0, 0);
  midnightYesterday = midnightYesterday.getTime();
  return midnightYesterday;
}
