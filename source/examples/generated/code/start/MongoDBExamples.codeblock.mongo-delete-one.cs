var filter = new BsonDocument("Name", "Thai Basil");
var deleteResult = await plantsCollection.DeleteOneAsync(filter);