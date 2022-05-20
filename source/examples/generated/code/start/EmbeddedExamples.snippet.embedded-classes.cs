public class Address : EmbeddedObject
{
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    [MapTo("street")]
    public string Street { get; set; }

    [MapTo("city")]
    public string City { get; set; }

    [MapTo("country")]
    public string Country { get; set; }

    [MapTo("postalCode")]
    public string PostalCode { get; set; }

}
public class Contact : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("address")]
    public Address Address { get; set; } // embed a single address 

}
public class Business : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("addresses")]
    public IList<Address> Addresses { get; }
}