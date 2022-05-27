var firstPlants = realm.All<Inventory>().ElementAt(0).Plants;
// convert the Plant List to an IQueryable and apply a filter
// to find plants with a name of "Prickly Pear"
var pricklyPearCacti = firstPlants.AsQueryable().Where(plant => plant.Name == "Prickly Pear");

// Alternatively, apply a filter directly on the plant list
var pricklyPearCactiCactiPlants = firstPlants.Filter("Name == 'Prickly Pear'");

// Find all Inventory items that have a green colored plant
var greenPlants = realm.All<Inventory>().Filter("Plants.Color CONTAINS[c] 'Green'");
