var updateResult = await plantsCollection.UpdateManyAsync(
    new BsonDocument("_partition", "Store 47"),
    new BsonDocument("$set", new BsonDocument("_partition", "Area 51")));