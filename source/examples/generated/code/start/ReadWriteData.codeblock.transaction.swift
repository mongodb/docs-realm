// Open the default realm.
let realm = try! Realm()

// Prepare to handle exceptions.
do {
    // Open a thread-safe transaction.
    try realm.write {

    }
} catch let error as NSError {
    // Failed to write to realm.
    // ... Handle error ...
}
