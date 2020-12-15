public class Dog : RealmObject
{
    public string Name { get; set; }
}

public class Person : RealmObject
{
    // ... other property declarations
    public IList<Dog> Dogs { get; }
}
