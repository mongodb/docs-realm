let person = Person(name: "Jane")
let realm = try! Realm()

try! realm.write {
    realm.add(person)
}

// Create thread-safe reference to person
let personRef = ThreadSafeReference(to: person)

// Pass the reference to a background thread
DispatchQueue(label: "background").async {
    autoreleasepool {
        let realm = try! Realm()
        guard let person = realm.resolve(personRef) else {
            return // person was deleted
        }
        try! realm.write {
            person.name = "Jane Doe"
        }
    }
}
