// Get an immutable copy of the realm that can be passed across threads
let frozenRealm = realm.freeze()

let dogs = realm.objects(Dog.self)

// You can freeze collections
let frozenDogs = dogs.freeze()

// You can still read from frozen realms
let frozenDogs2 = frozenRealm.objects(Dog.self)

let dog = dogs.first!

// You can freeze objects
let frozenDog = dog.freeze()
