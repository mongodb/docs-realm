public class Business : RealmObject
{
    public string Name { get; }
    public IList<Contact> Contacts { get; }

    public Business() { }
    public Business(String name, IList<Contact> contacts)
    {
        this.Name = name;
        this.Contacts = contacts;
    }
}

public class Contact : RealmObject
{
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address : RealmObject
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string PostalCode { get; set; }

    public Address() { }
}