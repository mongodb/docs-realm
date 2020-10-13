var petunia = await plantsCollection.FindOneAsync(
    new BsonDocument("Name", "Petunia"), null);