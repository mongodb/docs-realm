var pipeline = new object[] {
    new BsonDocument("$group",
    new BsonDocument
        {
            { "_id", "$Type" },
            { "count",
    new BsonDocument("$sum", 1) }
        }),
    new BsonDocument("$sort",
    new BsonDocument("_id", 1))
};

var aggResult = await plantsCollection.AggregateAsync(pipeline);

Assert.AreEqual("_id=0", aggResult[0].GetElement("_id").ToString());
Assert.AreEqual("count=2", aggResult[0].GetElement("count").ToString());
Assert.AreEqual("_id=1", aggResult[1].GetElement("_id").ToString());
Assert.AreEqual("count=3", aggResult[1].GetElement("count").ToString());
