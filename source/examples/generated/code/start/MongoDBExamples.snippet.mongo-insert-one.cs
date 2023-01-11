var plant = new Plant
{
    Name = "Venus Flytrap",
    Sunlight = Sunlight.Full,
    Color = PlantColor.White,
    Type = PlantType.Perennial,
    Partition = "Store 42"
};

var insertResult = await plantsCollection.InsertOneAsync(plant);
var newId = insertResult.InsertedId;