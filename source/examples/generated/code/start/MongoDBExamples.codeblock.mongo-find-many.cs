var allPerennials = await plantsCollection.FindAsync<Plant>(
    new BsonDocument("type", PlantType.perennial), null);