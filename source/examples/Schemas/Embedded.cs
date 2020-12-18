public class Address : EmbeddedObject
{
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    [MapTo("street")]
    public string Street { get; set; }

    [MapTo("city")]
    public string City { get; set; }

}

public class Contact : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("address")]
    public Address Address { get; set; } // embed a single address 

}
