public class Dog : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    [Required]
    public string Name { get; set; }

    public int Age { get; set; }
    public string Breed { get; set; }
    public IList<Person> Owners { get; }
}

public class Person : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    [Required]
    public string Name { get; set; }
    //etc...

    /* To add items to the IList<T>:

    var dog = new Dog();
    var caleb = new Person { Name = "Caleb" };
    dog.Owners.Add(caleb);

    */
}