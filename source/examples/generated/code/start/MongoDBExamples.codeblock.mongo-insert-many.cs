var sweetBasil = new Plant
{
    Name = "Sweet Basil",
    Sunlight = Sunlight.Partial,
    Color = PlantColor.Green,
    Type = PlantType.Annual,
    Partition = "Store 42"
};
var thaiBasil = new Plant
{
    Name = "Thai Basil",
    Sunlight = Sunlight.Partial,
    Color = PlantColor.Green,
    Type = PlantType.Perennial,
    Partition = "Store 42"
};
var helianthus = new Plant
{
    Name = "Helianthus",
    Sunlight = Sunlight.Full,
    Color = PlantColor.Yellow,
    Type = PlantType.Annual,
    Partition = "Store 42"
};
var petunia = new Plant
{
    Name = "Petunia",
    Sunlight = Sunlight.Full,
    Color = PlantColor.Purple,
    Type = PlantType.Annual,
    Partition = "Store 47"
};

var listofPlants = new List<Plant>
{
    sweetBasil,
    thaiBasil,
    helianthus,
    petunia
};

var insertResult = await plantsCollection.InsertManyAsync(listofPlants);
var newIds = insertResult.InsertedIds;