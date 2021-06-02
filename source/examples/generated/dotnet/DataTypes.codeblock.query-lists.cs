// Find all Inventory items that have a name of "Prickly Pear"
var certainCacti = realm.All<Inventory>().Filter("Plants.Name == 'Prickly Pear'");

// Find all Inventory items that have a name of "Prickly Pear"
var greenPlants = realm.All<Inventory>().Filter("Plants.Color CONTAINS[c] 'Green'");
