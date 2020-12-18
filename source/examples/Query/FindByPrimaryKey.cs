var myTask = new Task
{
    Id = 1
};

// Find specific object by primary key
var obj = realm.Find<MyObject>(1);
