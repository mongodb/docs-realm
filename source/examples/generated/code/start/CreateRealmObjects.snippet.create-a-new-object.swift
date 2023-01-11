// (1) Create a Dog object and then set its properties
let myDog = Dog()
myDog.name = "Rex"
myDog.age = 10

// (2) Create a Dog object from a dictionary
let myOtherDog = Dog(value: ["name": "Pluto", "age": 3])

// (3) Create a Dog object from an array
let myThirdDog = Dog(value: ["Fido", 5])

// Get the default realm. You only need to do this once per thread.
let realm = try! Realm()

// Add to the realm inside a transaction
try! realm.write {
    realm.add(myDog)
}
