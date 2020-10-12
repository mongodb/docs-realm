var filter = new BsonDocument("name", "Pothos")
    .Add("type", PlantType.perennial)
    .Add("sunlight", Sunlight.full);

var updateResult = await plantsCollection.UpdateOneAsync(
    filter,
    new BsonDocument("_partition", "store 42"),
    upsert: true);

/* The upsert will create the following object:

{
   "name": "pothos",
   "sunlight": "full",
   "type": "perennial",
   "_partition": "Store 42"
}
*/