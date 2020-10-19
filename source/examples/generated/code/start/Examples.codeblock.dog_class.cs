public class Dog : RealmObject
{
    [Required]
    public string Name { get; set; }

    public int Age { get; set; }
    public string Breed { get; set; }
    public IList<Person> Owners { get; }

    public Dog() { }

    public Dog (IList<Person> owners)
    {
        this.Owners = owners;
    }
}

public class Person : RealmObject
{
    [Required]
    public string Name { get; set; }
    //etc...
}