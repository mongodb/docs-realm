// :replace-start: {
//   "terms": {
//     "MutableSetExamples_": ""
//   }
// }

import XCTest
import RealmSwift

// :code-block-start: set-collections-model
class MutableSetExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
}
// :code-block-end:

class MutableSetExample: XCTestCase {

    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testMutableSet() {
        // :code-block-start: set-collections
        let realm = try! Realm()

        // Record a dog's name and current city
        let dog = MutableSetExamples_Dog()
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
        // :code-block-end:

        // :code-block-start: set-intersection-methods
        // Record another dog's name and give it a longer set of cities,
        // some of which overlap the first dog's set
        let dog2 = MutableSetExamples_Dog()
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
        // :code-block-end:
    }
}
// :replace-end:
