var pipeline = new object[] {
    new BsonDocument("$project",
    new BsonDocument
    {
        { "Partition", 1 },
        { "Type", 1 },
        { "Name", 1 },
        { "StoreNumber",
            new BsonDocument("$arrayElemAt",
            new BsonArray {
                new BsonDocument("$split",
                new BsonArray
                    {
                        "$Partition",
                        " "
                    }), 1 }) }
    }),
    new BsonDocument("$project", new BsonDocument("Id", 0))
};

var aggResult = await plantsCollection.AggregateAsync(pipeline);

Assert.AreEqual(5, aggResult.Length);
Assert.Throws<KeyNotFoundException>(() => aggResult[0].GetElement("Id"));
Assert.AreEqual("StoreNumber=42", aggResult[0].GetElement("StoreNumber").ToString());