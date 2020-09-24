try! realm.write {
    // Create a person to take care of some dogs.
    let ali = Person(value: ["id": 1, "name": "Ali"])
    realm.add(ali)

    // Find dogs younger than 2.
    let puppies = realm.objects(Dog.self).filter("age < 2")
    
    // Give all puppies to Ali.
    puppies.setValue(ali, forKey: "owner")
}
