// Declare your schema
class LoneClass : RealmObject
{
    public string Name { get; set; }
}

class AnotherClass
{
    private void SetUpMyRealmConfig()
    {
        // Define your config with a single class
        var config = new RealmConfiguration("RealmWithOneClass.realm");
        config.ObjectClasses = new[] { typeof(LoneClass) };

        // Or, specify multiple classes to use in the Realm
        config.ObjectClasses = new[] { typeof(Dog), typeof(Cat) };
    }
}
