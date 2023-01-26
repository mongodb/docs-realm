// Object to be stored in the Realm instance
var myItem = new Item
{
    Id = 1
};

realm.Write(() =>
{
    realm.Add(myItem);
});

// Other code...

// Find specific object by primary key
var obj = realm.Find<Item>(1);
