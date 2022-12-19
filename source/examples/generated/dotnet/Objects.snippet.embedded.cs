public partial class Address : IEmbeddedObject
{
    public ObjectId Id { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
}

public partial class Contact : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public Address Address { get; set; } // embed a single address 
}
