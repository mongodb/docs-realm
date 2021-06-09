var inventory = new Inventory();
inventory.PlantSet.Add(new Plant() { Name = "Prickly Pear" });
inventory.DoubleSet.Add(123.45);

realm.Write(() =>
{
    realm.Add<Inventory>(inventory);
});

// Find all Plants that have "Prickly Pear" in the name
var pricklyPear = realm.All<Inventory>()
    .Filter("PlantSet.Name CONTAINS 'Prickly Pear'");

// Find all Inventory items that have at least one value in their
// IntDict that is larger than 5
var moreThan100 = realm.All<Inventory>()
    .Filter("DoubleSet.@values > 100");
