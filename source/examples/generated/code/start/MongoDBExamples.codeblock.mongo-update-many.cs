var updateResult = await plantsCollection.UpdateManyAsync(
    new BsonDocument("Partition", "Store 47"),
    new BsonDocument("$set", new BsonDocument("Partition", "Area 51")));