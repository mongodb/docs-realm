public class Person : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public DateTimeOffset Birthdate { get; set; }
    public IList<Dog> Dogs { get; }
}
public class Dog : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Breed { get; set; }
}