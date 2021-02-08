public class Person : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    public string FullName { get; set; }
    public DateTimeOffset Birthday { get; set; }
}
