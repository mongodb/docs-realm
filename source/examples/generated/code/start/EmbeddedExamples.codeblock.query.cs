var losAngelesContacts = realm.All<Contact>().Filter("Address.City == 'Los Angeles'"); // Find All Contacts with an Address of "Los Angeles"

foreach (Contact losAngelesContact in losAngelesContacts)
{
    Console.WriteLine("Los Angeles Contact:");
    Console.WriteLine(losAngelesContact.Name);
    Console.WriteLine(losAngelesContact.Address.Street);
}