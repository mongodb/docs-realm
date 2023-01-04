// Find all Inventory items that have at least one value in their
// IntDictionary that is larger than 5 using RQL
var matchesMoreThanFive = realm.All<Inventory>()
    .Filter("NullableIntDictionary.@values > 5");

// Find all Inventory items where the RequiredStringsDictionary has a key
// "Foo", and the value of that key contains the phrase "bar"
// (case insensitive)
var matches = realm.All<Inventory>()
    .Filter("RequiredStringsDictionary['foo'] CONTAINS[c] 'bar'");
// matches.Count() == 2

// Query the PlantDict property of an Inventory object
// for a specific plant
var myStoreInventory = realm.All<Inventory>().FirstOrDefault();
var petunia = myStoreInventory.Plants.FirstOrDefault(p => p.Key == "Petunia");
