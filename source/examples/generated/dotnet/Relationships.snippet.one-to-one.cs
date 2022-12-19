public partial class Person : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public DateTimeOffset Birthdate { get; set; }
    public Dog Dog { get; set; }
}

public partial class Dog : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Breed { get; set; }
}
