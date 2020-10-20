public class Dog : RealmObject
{
    [Required]
    public string Name { get; set; }

    public int Age { get; set; }
    public string Breed { get; set; }
    public IList<Person> Owners { get; }

    public Dog()
    {
        this.Owners = new List<Person>();
    }

    public Dog(Person owner)
    {
        this.Owners = new List<Person>
        {
            owner
        };
    }
}

public class Person : RealmObject
{
    [Required]
    public string Name { get; set; }
    //etc...
}