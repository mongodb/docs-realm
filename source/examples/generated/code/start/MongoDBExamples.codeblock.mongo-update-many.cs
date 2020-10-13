var foo = plantsCollection.FindAsync(
 new BsonDocument("Partition", "Store 47")).Result;


var updateResult = await plantsCollection.UpdateManyAsync(
    new BsonDocument("$set", new BsonDocument("Partition", "Area 51")),
    new BsonDocument("Partition", "Store 47"));