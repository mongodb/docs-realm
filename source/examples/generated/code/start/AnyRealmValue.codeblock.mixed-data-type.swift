// Create a Dog object and then set its properties
let myDog = Dog()
myDog.name = "Rex"
// Because we declared age as a `RealmProperty`, we must mutate its `value` property
myDog.age.value = .int(5)

// Create another Dog object whose age is a float
let myOtherDog = Dog()
myOtherDog.name = "Spot"
myOtherDog.age.value = .float(2.5)

// Create a third Dog object whose age is a string
let myThirdDog = Dog()
myThirdDog.name = "Fido"
myOtherDog.age.value = .string("3 and 3/4")

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
if case let .int(age) = myDog.age.value {
    print(age)  // Prints 5
}

// In this example, "myOtherDog"'s age is a float type, so checking the type
// before trying to use it avoids an exception
if case let .int(age) = myOtherDog.age.value {
    print(age)  // Doesn't print anything
}
