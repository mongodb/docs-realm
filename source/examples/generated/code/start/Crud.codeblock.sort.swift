let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by dog's owner's name.
let ownersByName = dogs.sorted(byKeyPath: "owner.name")
