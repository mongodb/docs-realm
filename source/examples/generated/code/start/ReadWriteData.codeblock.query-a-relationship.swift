let realm = try! Realm()

// Establish a relationship
let dog = Dog()
dog.name = "Rex"
dog.age = 10

let owner = DogOwner()
owner.id = 12345
owner.dogs.append(dog)

try! realm.write {
    realm.add(owner)
}

// Later, query the specific owner
let specificOwner = realm.object(ofType: DogOwner.self, forPrimaryKey: 12345)

// Access directly through a relationship
print("# dogs: \(specificOwner!.dogs.count)")
print("First dog's name: \(specificOwner!.dogs[0].name)")