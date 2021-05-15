let realm = try! Realm()

// Record a dog's name and current city
let dog = Dog()
dog.name = "Maui"
dog.currentCity = "New York"

// Store the data in a realm. Add the dog's current city
// to the citiesVisited MutableSet
try! realm.write {
    realm.add(dog)
    dog.citiesVisited.insert(dog.currentCity)
}

// Later... update the dog's current city, and add it to the set of cities visited
try! realm.write {
    dog.currentCity = "Toronto"
    dog.citiesVisited.insert(dog.currentCity)
}

// Send him back to New York
try! realm.write {
    dog.currentCity = "New York"
    dog.citiesVisited.insert(dog.currentCity)
}

// Get some information about the cities he has visited
print("Cities Maui has visited: \(dog.citiesVisited)")
// Prints "New York", "Toronto"

// Because 'citiesVisited' is a MutableSet, you only see
// New York listed once, even though he has been there twice
XCTAssert(dog.citiesVisited.count == 2)
