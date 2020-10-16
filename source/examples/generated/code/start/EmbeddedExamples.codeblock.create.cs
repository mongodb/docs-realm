var business = new Business(
    "Moe's Tacos",
    new List<Contact>
    {
        new Contact()
        {
            Name = "Moe",
            Address = new Address()
            {
                Street = "1 Main St.",
                City = "Hoboken",
                State = "HI",
                PostalCode = "99922",
                Country = "USA"
            }
        },
        new Contact()
        {
            Name = "Caleb",
            Address = new Address()
            {
                Street = "27 Maine St.",
                City = "Lakeshore",
                State = "Michigan",
                PostalCode = "45678",
                Country = "USA"
            }
        }
    });

realm.Write(() =>
{
    realm.Add(business);
});