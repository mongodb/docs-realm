// Object to be stored in the Realm instance
var myTask = new ReadsTask
{
    Id = 1
};

realm.Write(() =>
{
    realm.Add(myTask);
});

// Other code...

// Find specific object by primary key
var obj = realm.Find<ReadsTask>(1);
