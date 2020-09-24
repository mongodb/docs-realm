// Instantiate the class. For convenience, you can initialize
// objects from dictionaries with appropriate keys and values.
let dog = Dog(value: ["name": "Max", "age": 5]);

// Open a thread-safe transaction.
try! realm.write {
    // Add the instance to the realm.
    realm.add(dog)
}
