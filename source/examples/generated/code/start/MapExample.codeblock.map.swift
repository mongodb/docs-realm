let realm = try! Realm()
// Record a dog's name and current city
let dog = Dog()
dog.name = "Wolfie"
dog.currentCity = "New York"
// Store the data in a realm
try! realm.write {
    realm.add(dog)
    // Set values
    dog.favoriteParksByCity["New York"] = "Domino Park"
    dog.favoriteParksByCity["Chicago"] = "Wiggly Field"
    // Another way to set values
    dog.favoriteParksByCity.setValue("Bush Park", forKey: "Ottawa")

    // Overwrite a value
    dog.favoriteParksByCity["New York"] = "Washington Square Park"
}

// Check if an entry exists
if dog.favoriteParksByCity.keys.contains("Chicago") {
    print("\(dog.name)' has a favorite park in Chicago")
}

// Iterate over entries
for element in dog.favoriteParksByCity {
    print("\(dog.name)'s favorite park in \(element.key) is \(element.value)")
}

// Delete an entry
try! realm.write {
    // Use removeObject(for:)
    dog.favoriteParksByCity.removeObject(for: "New York")
    // Or assign `nil` to delete non-optional values.
    // If the value type were optional (e.g. Map<String, String?>)
    // this would assign `nil` to that entry rather than deleting it.
    dog.favoriteParksByCity["New York"] = nil
}
