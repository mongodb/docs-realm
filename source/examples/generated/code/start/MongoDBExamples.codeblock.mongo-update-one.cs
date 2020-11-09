var updateResult = await plantsCollection.UpdateOneAsync(
    new BsonDocument("sunlight", Sunlight.Partial.ToString()),
    new { name = "Petunia" });