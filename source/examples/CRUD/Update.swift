// Open a thread-safe transaction.
try! realm.write {
    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.name = "Wolfie";
    dog.age += 1;
}
