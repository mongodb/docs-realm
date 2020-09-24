public class Person : RealmObject
{
    public String Name { get; set; }
    public Date Birthdate { get; set; }
    public IList<Dog> Dogs { get; set; }
}

public class Dog : RealmObject
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string? Breed { get; set; }
}
