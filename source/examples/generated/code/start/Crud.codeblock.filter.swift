let realm = try! Realm()
// Access all dogs in the realm
let dogs = realm.objects(Dog.self)

// Filter by age
let puppies = dogs.filter("age < 2")

// Filter by owner
let availableDogs = dogs.filter("owner == nil")

// Filter by owner's name
let ownedByKeith = dogs.filter("owner.name == 'Keith'")
