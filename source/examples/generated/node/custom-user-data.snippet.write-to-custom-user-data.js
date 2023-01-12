// A user must be logged in to use a mongoClient
const user = await app.logIn(credentials);
console.log(user.id);
const mongo = user.mongoClient("<atlasServiceName>");
const collection = mongo.db("<databaseName>").collection("<collectionName>");

const filter = {
  // Query for the user object of the logged in user
  userID: user.id,
};

const updateDoc = {
  // Set the logged in user's favorite color to pink
  $set: {
    favoriteColor: "pink",
  },
};

const result = await collection.updateOne(filter, updateDoc);
console.log(result);

// Console output: { matchedCount: 1, modifiedCount: 1 }
