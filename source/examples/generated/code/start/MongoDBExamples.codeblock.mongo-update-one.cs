var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("sunlight", Sunlight.Partial.ToString()),
    new BsonDocument("name", "Petunia"));