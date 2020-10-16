// Find Businesses where any of the Contacts in the Business
// have an address in Hawaii
var businessesInHawaii = realm.All<Business>()
    .Where(b => b.Contacts.Any(c => c.Address.State == "HI"))
    .OrderBy(b => b.Name);
