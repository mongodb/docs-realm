var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("Name", "Petunia"),
    new BsonDocument("Sunlight", Sunlight.partial));