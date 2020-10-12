var filter = new BsonDocument("type", PlantType.annual);
var deleteResult = await plantsCollection.DeleteManyAsync(filter);