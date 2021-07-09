// Create a Dog object and then set its properties
// In this case, the dog's age is an int
let myDog = Dog()
myDog.name = "Rex"
myDog.age = .int(5)
// This dog has no companion.
// You can set the field's type to "none", which represents `nil`
myDog.companion = .none

// Create another Dog object whose age is a float
let myOtherDog = Dog()
myOtherDog.name = "Spot"
myOtherDog.age = .float(2.5)
// This dog's companion is a cat named Fluffy, represented by a string here
myOtherDog.companion = .string("Fluffy the Cat")

// Create a third Dog object whose age is a string
let myThirdDog = Dog()
myThirdDog.name = "Fido"
myThirdDog.age = .string("3 months")
// This dog's companion is a Person, which is an object that has a
// string name, an optional string address, and an int age
myThirdDog.companion = .object(Person(value: ["name": "Sylvia", "age": 12]))

// Get the default realm. You only need to do this once per thread.
let realm = try! Realm()

// Add to the realm inside a transaction
try! realm.write {
    realm.add(myDog)
    realm.add(myOtherDog)
    realm.add(myThirdDog)
}

// Verify the type of the ``AnyRealmProperty`` when attempting to get it. This
// returns an object whose property contains the matched type.
if case let .int(age) = myDog.age {
    print(age)  // Prints 5
}

// In this example, "myOtherDog"'s age is a float type, so checking the type
// before trying to use it avoids an exception
if case let .int(age) = myOtherDog.age {
    print(age)  // Doesn't print anything
}

// Retreiving an object stored as an ``AnyRealmProperty`` gives you
// the complete object, containing all of the object's properties
if case let .object(companion) = myThirdDog.companion {
    print(companion)
    // Prints all the details of the Person object:
    // {name = Sylvia; address = null; age = 12;}
}
