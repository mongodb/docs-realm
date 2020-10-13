var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("Sunlight", Sunlight.partial),
    new BsonDocument("Name", "Petunia"));