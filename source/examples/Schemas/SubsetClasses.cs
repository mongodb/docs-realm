// Declare your schema
class LoneClass : RealmObject
{
    public string Name { get; set;}
}

// In your main function, define your config
var config = new RealmConfiguration("RealmWithOneClass.realm");
config.ObjectClasses = new[] { typeof(LoneClass) };

// or specifying two classes in the Realm
config.ObjectClasses = new[] { typeof(Dog), typeof(Cat) };
