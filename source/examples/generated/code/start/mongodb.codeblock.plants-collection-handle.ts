const mongodb: Realm.Services.MongoDB = app.currentUser.mongoClient(
  "mongodb-atlas"
);
const plants: MongoDBCollection<Plant> = mongodb
  .db("example")
  .collection("plants");