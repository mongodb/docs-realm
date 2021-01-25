let realm = try! Realm()

// Establish a relationship
let dog = Dog()
dog.name = "Rex"
dog.age = 10

let person = Person()
person.id = 12345
person.dogs.append(dog)

try! realm.write {
    realm.add(person)
}

// Later, query the specific person
let specificPerson = realm.object(ofType: Person.self, forPrimaryKey: 12345)

// Access directly through a relationship
print("# dogs: \(specificPerson!.dogs.count)")
print("First dog's name: \(specificPerson!.dogs[0].name)")
