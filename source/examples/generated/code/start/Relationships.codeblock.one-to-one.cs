public class Person : RealmObject
{
    public string Name { get; set; }
    public DateTimeOffset Birthdate { get; set; }
    public Dog Dog { get; set; }
}

public class Dog : RealmObject
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Breed { get; set; }
}