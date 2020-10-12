var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("name", "petunia"),
    new BsonDocument("sunlight", Sunlight.partial));