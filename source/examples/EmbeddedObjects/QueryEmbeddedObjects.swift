let losAngelesContacts = realm.objects(Contact.self)
    .filter("address.city = %@", "Los Angeles")
    .sorted(byKeyPath: "address.street")
print("Los Angeles Contacts: \(losAngelesContacts)")
