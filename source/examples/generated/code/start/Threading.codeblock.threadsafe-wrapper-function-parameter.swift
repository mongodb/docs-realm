func loadNameInBackground(@ThreadSafe person: Person?) async {
    let newName = await someLongCallToGetNewName()
    let realm = try! await Realm()
    try! realm.write {
        person?.name = newName
    }
}

let realm = try! await Realm()

let person = Person(name: "Jane")
try! realm.write {
    realm.add(person)
}
await loadNameInBackground(person: person)
