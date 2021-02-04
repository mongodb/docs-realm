public class Person : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    public string FullName { get; set; }
    public int Age { get; set; }
}
