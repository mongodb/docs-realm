// :replace-start: {
//   "terms": {
//     "ReadExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :snippet-start: models
class ReadExamples_DogToy: Object {
    @Persisted var name = ""
}

class ReadExamples_Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""

    // To-one relationship
    @Persisted var favoriteToy: ReadExamples_DogToy?
}

class ReadExamples_Person: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""

    // To-many relationship - a person can have many dogs
    @Persisted var dogs: List<ReadExamples_Dog>

    // Inverse relationship - a person can be a member of many clubs
    @Persisted(originProperty: "members") var clubs: LinkingObjects<ReadExamples_DogClub>
}

class ReadExamples_DogClub: Object {
    @Persisted var name = ""
    @Persisted var members: List<ReadExamples_Person>
}
// :snippet-end:

// :snippet-start: object-id-model
class ReadExamples_User: Object {
    @Persisted var id: ObjectId
    @Persisted var name = ""
}
// :snippet-end:

class ReadRealmObjects: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }

    func testFindObjectByPrimaryKey() {
        // :snippet-start: find-a-specific-object-by-primary-key
        let realm = try! Realm()

        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)
        // :snippet-end:
    }

    func testQueryRelationship() {
        // :snippet-start: query-a-relationship
        let realm = try! Realm()

        // Establish a relationship
        let dog = ReadExamples_Dog()
        dog.name = "Rex"
        dog.age = 10

        let person = ReadExamples_Person()
        person.id = 12345
        person.dogs.append(dog)

        try! realm.write {
            realm.add(person)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through a relationship
        let specificPersonDogs = specificPerson!.dogs
        let firstDog = specificPersonDogs[0]
        print("# dogs: \(specificPersonDogs.count)")
        print("First dog's name: \(firstDog.name)")
        // :snippet-end:
    }

    func testQueryInverseRelationship() {
        // :snippet-start: query-an-inverse-relationship
        let realm = try! Realm()

        // Establish an inverse relationship
        let person = ReadExamples_Person()
        person.id = 12345

        let club = ReadExamples_DogClub()
        club.name = "Pooch Pals"
        club.members.append(person)

        try! realm.write {
            realm.add(club)
        }

        // Later, query the specific person
        let specificPerson = realm.object(ofType: ReadExamples_Person.self, forPrimaryKey: 12345)

        // Access directly through an inverse relationship
        let clubs = specificPerson!.clubs
        let firstClub = clubs[0]
        print("# memberships: \(clubs.count)")
        print("First club's name: \(firstClub.name)")
        // :snippet-end:
    }

    func testObjects() {
        // :snippet-start: objects
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)
        // :snippet-end:
    }

    func testSort() {
        // :snippet-start: sort
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        let dogsSorted = dogs.sorted(byKeyPath: "name", ascending: false)

        // You can also sort on the members of linked objects. In this example,
        // we sort the dogs by their favorite toys' names.
        let dogsSortedByFavoriteToyName = dogs.sorted(byKeyPath: "favoriteToy.name")
        // :snippet-end:
    }

    func testFilter() {
        // :snippet-start: filter
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        // Filter by age
        let puppies = dogs.filter("age < 2")

        // Filter by person
        let dogsWithoutFavoriteToy = dogs.filter("favoriteToy == nil")

        // Filter by person's name
        let dogsWhoLikeTennisBalls = dogs.filter("favoriteToy.name == 'Tennis ball'")
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testWhere() {
        // :snippet-start: where
        let realm = try! Realm()
        // Access all dogs in the realm
        let dogs = realm.objects(ReadExamples_Dog.self)

        // Query by age
        let puppies = dogs.where {
            $0.age < 2
        }

        // Query by person
        let dogsWithoutFavoriteToy = dogs.where {
            $0.favoriteToy == nil
        }

        // Query by person's name
        let dogsWhoLikeTennisBalls = dogs.where {
            $0.favoriteToy.name == "Tennis ball"
        }
        // :snippet-end:
        print(puppies.count)
        print(dogsWithoutFavoriteToy.count)
        print(dogsWhoLikeTennisBalls.count)
    }

    func testQueryObjectId() {
        // :snippet-start: query-object-id
        let realm = try! Realm()

        let users = realm.objects(ReadExamples_User.self)

        // Get specific user by ObjectId id
        let specificUser = users.filter("id = %@", ObjectId("11223344556677889900aabb")).first

        // WRONG: Realm will not convert the string to an object id
        // users.filter("id = '11223344556677889900aabb'") // not ok
        // users.filter("id = %@", "11223344556677889900aabb") // not ok
        // :snippet-end:
        print("\(specificUser ?? ReadExamples_User())")
    }

    func testTypeSafeQueryObjectId() {
        // :snippet-start: tsq-object-id
        let realm = try! Realm()

        let users = realm.objects(ReadExamples_User.self)

        // Get specific user by ObjectId id
        let specificUser = users.where {
            $0.id == ObjectId("11223344556677889900aabb")
        }
        // :snippet-end:
        print("\(specificUser)")
    }

    func testAggregate() {
        // :snippet-start: aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadExamples_Person.self)

        // People whose dogs' average age is 5
        people.filter("dogs.@avg.age == 5")

        // People with older dogs
        people.filter("dogs.@min.age > 5")

        // People with younger dogs
        people.filter("dogs.@max.age < 2")

        // People with many dogs
        people.filter("dogs.@count > 2")

        // People whose dogs' ages combined > 10 years
        people.filter("dogs.@sum.age > 10")
        // :snippet-end:
    }

    func testTypeSafeQueryAggregate() {
        // :snippet-start: tsq-aggregate
        let realm = try! Realm()

        let people = realm.objects(ReadExamples_Person.self)

        // People whose dogs' average age is 5
        people.where {
            $0.dogs.age.avg == 5
        }

        // People with older dogs
        people.where {
            $0.dogs.age.min > 5
        }

        // People with younger dogs
        people.where {
            $0.dogs.age.max < 2
        }

        // People with many dogs
        people.where {
            $0.dogs.count > 2
        }

        // People whose dogs' ages combined > 10 years
        people.where {
            $0.dogs.age.sum > 10
        }
        // :snippet-end:
    }

    func testChainQuery() {
        // :snippet-start: chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadExamples_Dog.self).filter("color = 'tan'")
        let tanDogsWithBNames = tanDogs.filter("name BEGINSWITH 'B'")
        // :snippet-end:
    }

    func testTypeSafeChainQuery() {
        // :snippet-start: tsq-chain-query
        let realm = try! Realm()
        let tanDogs = realm.objects(ReadExamples_Dog.self).where {
            $0.color == "tan"
        }
        let tanDogsWithBNames = tanDogs.where {
            $0.name.starts(with: "B")
        }
        // :snippet-end:
    }

}
// :replace-end:
