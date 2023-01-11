public partial class Dog : IRealmObject
{
    // ... other property declarations
    public Person Owner { get; set; }
}

public partial class Person : IRealmObject
{
    // ... other property declarations
    public string Name { get; set; }
}
