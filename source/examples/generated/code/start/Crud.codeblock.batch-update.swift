let realm = try! Realm()
try! realm.write {
    // Create a person to take care of some dogs.
    let person = CrudExample_Person(value: ["id": 1, "name": "Ali"])
    realm.add(person)

    let dog = CrudExample_Dog(value: ["name": "Rex", "age": 1])
    realm.add(dog)

    // Find dogs younger than 2.
    let puppies = realm.objects(CrudExample_Dog.self).filter("age < 2")
    
    // Give all puppies to Ali.
    puppies.setValue(person, forKey: "owner")
    
}