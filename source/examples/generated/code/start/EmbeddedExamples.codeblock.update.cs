var business = realm.All<Business>()
    .Where(b => b.Name == "Moe's Tacos")
    .OrderBy(b => b.Name)
    .FirstOrDefault();

realm.Write(() =>
{
    business.Contacts.First().Address.Street = "2 Main Street";
});