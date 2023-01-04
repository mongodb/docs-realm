public partial class Dog : IRealmObject
{
    // ... other property declarations
    public string Name { get; set; }
}

public partial class Person : IRealmObject
{
    // ... other property declarations
    public IList<Dog> Dogs { get; }
}
