var petunia = await plantsCollection.FindOneAsync(
    new BsonDocument("name", "Petunia"), null);