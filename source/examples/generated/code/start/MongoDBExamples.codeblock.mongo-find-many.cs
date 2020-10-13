var allPerennials = await plantsCollection.FindAsync(
    new BsonDocument("Type", PlantType.perennial), null);