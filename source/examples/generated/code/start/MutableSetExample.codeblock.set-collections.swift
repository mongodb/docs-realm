class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var currentCity = ""
    let citiesVisited = MutableSet<String>()
}

    func testMutableSet() {

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

        // Later, retreive the dog
        let dogs = realm.objects(Dog.self)
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
