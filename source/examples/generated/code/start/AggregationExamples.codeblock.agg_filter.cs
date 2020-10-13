var pipeline = new object[] {
    new BsonDocument("$match",
        new BsonDocument("Type",
            new BsonDocument("$eq", PlantType.perennial)))
};

var aggResult = await plantsCollection.AggregateAsync<Plant>(pipeline);

Assert.AreEqual(2, aggResult.Length);
Assert.AreEqual(venus.Id, aggResult[0].Id);
Assert.AreEqual(venus.Name, aggResult[0].Name);
Assert.AreEqual(thaiBasil.Id, aggResult[1].Id);
Assert.AreEqual(thaiBasil.Partition, aggResult[1].Partition);