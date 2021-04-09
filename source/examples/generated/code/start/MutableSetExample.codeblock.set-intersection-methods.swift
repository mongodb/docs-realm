// Record another dog's name and give it a longer set of cities,
// some of which overlap the first dog's set
let dog2 = Dog()
dog2.name = "Lita"
dog2.currentCity = "New York"
// Create an array of strings that represents all the cities the dog has visited
let dog2Cities = ["Boston", "New York", "Toronto", "Montreal", "Boston"]

// Use an iterator to store the data as a Realm MutableSet
try! realm.write {
    realm.add(dog2)
    for city in dog2Cities {
        dog2.citiesVisited.insert(city)
    }
}

// The array of strings initially assigned to the set contains 5 items,
// but only 4 of them are distinct, so the set count should be 4
print("Cities Lita has visited: \(dog2.citiesVisited)")
XCTAssert(dog2.citiesVisited.count == 4)

// Check whether Lita and Maui have visited some of the same cities.
// Use "intersects" to find out whether the values of the two sets share common elements
let isInBothCitiesVisited = (dog.citiesVisited.intersects(dog2.citiesVisited))

print("Lita and Maui have visited some of the same cities: \(isInBothCitiesVisited)")
// Prints "Lita and Maui have visited some of the same cities: true"

// Mutate the set in place with elements that both dogs have in common
try! realm.write {
    dog2.citiesVisited.formIntersection(dog.citiesVisited)
}

// This prints New York and Toronto, because those are the cities both sets have in common
print("Cities that both Maui and Lita have visited: \(dog2.citiesVisited)")
// Prints "New York" and "Toronto", because those are the cities both sets have in common
// Because this method mutates the set in place, the set now only contains 2 elements
XCTAssert(dog2.citiesVisited.count == 2)
