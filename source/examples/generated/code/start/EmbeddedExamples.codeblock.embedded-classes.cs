public class Address : EmbeddedObject
{
    public string Street { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string PostalCode { get; set; }

    public Address() { }
}
public class Contact : RealmObject
{

    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }

    public Address Address { get; set; } // embed a single address 

    public Contact() { }

}
public class Business : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }
    public IList<Address> addresses { get; }
}