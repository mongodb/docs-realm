// :replace-start: {
//   "terms": {
//     "MutableSetExamples_": ""
//   }
// }

import XCTest
import RealmSwift

// class MutableSetExamples_Dog: Object {
//    @objc dynamic var name = ""
//    @objc dynamic var breed: String?
// }
//
// class MutableSetExamples_Person: Object {
//    @objc dynamic var id = 0
//    @objc dynamic var name = ""
//
//    // To-many relationship - a person can have many dogs
//    let dogs = List<MutableSetExamples_Dog>()
//
//    override static func primaryKey() -> String? {
//        return "id"
//    }
// }

// :code-block-start: set-collections
class MutableSetExamples_Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var currentCity = ""
    let citiesVisited = MutableSet<String>()
}

// :hide-start:
class MutableSetExample: XCTestCase {

    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
// :hide-end:
    func testMutableSet() {

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

        // Later, retreive the dog
        let dogs = realm.objects(MutableSetExamples_Dog.self)
        let specificDog = dogs.filter("name == 'Maui'").first!
 
        // Update his current city, and add it to the set of cities visited
        try! realm.write {
            specificDog.currentCity = "Toronto"
            specificDog.citiesVisited.insert(specificDog.currentCity)
        }
        
        // Send him back to New York
        try! realm.write {
            specificDog.currentCity = "New York"
            specificDog.citiesVisited.insert(specificDog.currentCity)
        }
        
        // Get some information about the cities he has visited
        // This tells us he has visited New York and Toronto.
        print(specificDog.citiesVisited)
        // Because 'citiesVisited' is a MutableSet, you only see
        // New York listed once, even though he has been there twice
        XCTAssert(specificDog.citiesVisited.count == 2)
    }
    // :code-block-end:
}

// :replace-end:

// Create some dogs of specific breeds. Two of the dogs are the same breed.
//        let dog1 = MutableSetExamples_Dog()
//        dog1.name = "Alpha"
//        dog1.breed = "Beagle"
//
//        let dog2 = MutableSetExamples_Dog()
//        dog2.name = "Beta"
//        dog2.breed = "Labrador Retriever"
//
//        let dog3 = MutableSetExamples_Dog()
//        dog3.name = "Charlie"
//        dog3.breed = "Beagle"
//
//        // Create a relationship between the dogs and a specific person
//        let person = MutableSetExamples_Person()
//        person.id = 12345
//        person.dogs.append(objectsIn: [dog1, dog2, dog3])
//
//        try! realm.write {
//            realm.add(person)
//        }
//
//        // Later, query the specific person
//        let specificPerson = realm.object(ofType: MutableSetExamples_Person.self, forPrimaryKey: 12345)
//
//        // Create a Realm MutableSet of type String to store the dog breeds
//        let specificPersonsDogBreeds = MutableSet<String>()
//
//        // Iterate through the person's dogs, and add each breed to the set
//        for dog in specificPerson!.dogs {
//            specificPersonsDogBreeds.insert(dog.breed!)
//        }
//
//        // Get some details about the person's dogs.
//        // In this example, the person should have 3 dogs
//        print("# dogs: \(specificPerson!.dogs.count)")
//        XCTAssert(specificPerson!.dogs.count == 3)
//
//        // But the number of breeds in the set should only be 2
//        // Printing them yields Labrador Retriever and Beagle
//        print("Dog breeds: \(specificPersonsDogBreeds)")
//        XCTAssert(specificPersonsDogBreeds.count == 2)
//
//        // Check whether the set contains a specific value, and do something
//        // In this example, we'll see "At least one of this person's dogs is a Beagle"
//        if specificPersonsDogBreeds.contains("Beagle") {
//            print("At least one of this person's dogs is a Beagle")
//        }
