// Open the default realm
let realm = try! Realm()

// Get all contacts in Los Angeles, sorted by street address
let losAngelesContacts = realm.objects(Contact.self)
    .where {
        $0.address.city == "Los Angeles"
    }
    .sorted(byKeyPath: "address.street")
print("Los Angeles Contacts: \(losAngelesContacts)")
