var updateResult = await plantsCollection.UpdateManyAsync(
 new BsonDocument("_partition", "store 47"),
    new BsonDocument("_partition", "area 51"));