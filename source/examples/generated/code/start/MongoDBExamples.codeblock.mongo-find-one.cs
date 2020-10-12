var petunia = await plantsCollection.FindOneAsync<Plant>(
    new BsonDocument("name", "petunia"), null);