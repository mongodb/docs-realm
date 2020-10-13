var filter = new BsonDocument("Name", "Pothos")
    .Add("Type", PlantType.perennial)
    .Add("Sunlight", Sunlight.full);

var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("$set", new BsonDocument("Partition", "Store 42")),
    filter,
    upsert: true);

/* The upsert will create the following object:

{
   "name": "pothos",
   "sunlight": "full",
   "type": "perennial",
   "_partition": "Store 42"
}
*/