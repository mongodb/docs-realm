public class Dog : RealmObject
{
    // ... other property declarations
    public Person Owner { get; set; }
}

public class Person : RealmObject
{
    // ... other property declarations
    public string Name { get; set; }
}
