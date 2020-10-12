var plant = new Plant
{
    Name = "Venus Flytrap",
    Sunlight = Sunlight.full,
    Color = PlantColor.white,
    Type = PlantType.perennial,
    Partition = "Store 42"
};

var insertResult = await plantsCollection.InsertOneAsync(plant);
var newId = insertResult.InsertedId;