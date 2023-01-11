public class Address : EmbeddedObject
{
    public ObjectId Id { get; set; }

    public string Street { get; set; }

    public string City { get; set; }

}

public class Contact : RealmObject
{
    [PrimaryKey]
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    public Address Address { get; set; } // embed a single address 

}
