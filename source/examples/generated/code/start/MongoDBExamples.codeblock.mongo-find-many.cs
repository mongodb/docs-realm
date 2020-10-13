var allPerennials = await plantsCollection.FindAsync(
    new BsonDocument("type", PlantType.Perennial.ToString()), null);