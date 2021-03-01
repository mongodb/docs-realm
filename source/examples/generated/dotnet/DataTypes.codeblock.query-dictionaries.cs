// Find all Inventory items that have "Petunia"
// as a key in their PlantDict.
var petunias = realm.All<Inventory>()
    .Filter("PlantDict.@keys == 'Petunia'");

// Find all Inventory items that have at least one value in their
// IntDict that is larger than 5
var matchesMoreThanFive = realm.All<Inventory>()
    .Filter("NullableIntDict.@values > 5");
