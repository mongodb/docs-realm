var sweetBasil = new Plant
{
    Name = "Sweet Basil",
    Sunlight = Sunlight.partial,
    Color = PlantColor.green,
    Type = PlantType.annual,
    Partition = "Store 42"
};
var thaiBasil = new Plant
{
    Name = "Thai Basil",
    Sunlight = Sunlight.partial,
    Color = PlantColor.green,
    Type = PlantType.perennial,
    Partition = "Store 42"
};
var helianthus = new Plant
{
    Name = "Helianthus",
    Sunlight = Sunlight.full,
    Color = PlantColor.yellow,
    Type = PlantType.annual,
    Partition = "Store 42"
};
var petunia = new Plant
{
    Name = "Petunia",
    Sunlight = Sunlight.full,
    Color = PlantColor.purple,
    Type = PlantType.annual,
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