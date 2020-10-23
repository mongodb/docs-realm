public class Person : RealmObject
{
    public string Name { get; set; }
    public DateTimeOffset Birthdate { get; set; }
    public IList<Dog> Dogs { get; }
}

public class Dog : RealmObject
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Breed { get; set; }
}