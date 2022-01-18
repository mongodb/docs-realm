// :replace-start: {
//   "terms": {
//     "ClassProjectionExample_": ""
//   }
// }

import XCTest
import RealmSwift

// :code-block-start: models
class ClassProjectionExample_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var address: ClassProjectionExample_Address?
    @Persisted var friends = List<ClassProjectionExample_Person>()
}

class ClassProjectionExample_Address: EmbeddedObject {
    @Persisted var city: String = ""
    @Persisted var country = ""
}
// :code-block-end:

// :code-block-start: declare-class-projection
class ProjectionExample_PersonProjection: Projection<ClassProjectionExample_Person> {
    @Projected(\ClassProjectionExample_Person.firstName) var firstName // Passthrough from original object
    @Projected(\ClassProjectionExample_Person.address?.city) var homeCity // Rename and access embedded object property through keypath
    @Projected(\ClassProjectionExample_Person.friends.projectTo.firstName) var firstFriendsName: ProjectedCollection<String> // Collection mapping
}
// :code-block-end:

class ClassProjectionExample: XCTestCase {
    override func setUp() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: "ProjectionExample")
        let realm = try! Realm()

        let jason = ClassProjectionExample_Person(value: ["firstName": "Jason",
                                                     "lastName": "Bourne",
                                                     "address": [
                                                        "city": "Zurich",
                                                        "country": "Switzerland"]])
        let marie = ClassProjectionExample_Person(value: ["firstName": "Marie",
                                                     "lastName": "St. Jacques",
                                                     "address": [
                                                        "city": "Montreal",
                                                        "country": "Canada"]])

        try! realm.write {
            realm.add(jason)
            realm.add(marie)
            jason.friends.append(marie)
        }
    }

    override func tearDown() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: nil)
    }

    func testUseProjection() {
        let realm = try! Realm()

        // :code-block-start: retrieve-data-through-class-projection
        // Retrieve all class projections of the given type `PersonProjection`
        let people = realm.objects(ProjectionExample_PersonProjection.self)
        // Use projection data in your view
        print(people.first?.firstName)
        print(people.first?.homeCity)
        print(people.first?.firstFriendsName)
        // :code-block-end:
        // :code-block-start: change-class-projection-property-value-in-a-write
        // Retrieve all class projections of the given type `PersonProjection`
        // and filter for the first class projection where the `firstName` property
        // value is "Jason"
        let person = realm.objects(ProjectionExample_PersonProjection.self).first(where: { $0.firstName == "Jason" })!
        // :hide-start:
        XCTAssert(person.firstName == "Jason")
        XCTAssert(person.homeCity == "Zurich")
        // :hide-end:
        // Update class projection property in a write transaction
        try! realm.write {
            person.firstName = "David"
        }
        // :code-block-end:
        XCTAssert(person.firstName == "David")
    }
    // :code-block-start: test-with-class-projection
    func testWithProjection() {
        let realm = try! Realm()
        // Create a Realm object, populate it with values
        let jasonBourne = ClassProjectionExample_Person(value: ["firstName": "Jason",
                                                           "lastName": "Bourne",
                                                           "address": [
                                                            "city": "Zurich",
                                                            "country": "Switzerland"]])
        try! realm.write {
            realm.add(jasonBourne)
        }

        // Retrieve all class projections of the given type `PersonProjection`
        // and filter for the first class projection where the `firstName` property
        // value is "Jason"
        let person = realm.objects(ProjectionExample_PersonProjection.self).first(where: { $0.firstName == "Jason" })!
        // Verify that we have the correct PersonProjection
        XCTAssert(person.firstName == "Jason")
        // See that `homeCity` exists as a projection property
        // Although it is not on the object model
        XCTAssert(person.homeCity == "Zurich")

        // Change a value on the class projection
        try! realm.write {
            person.firstName = "David"
        }

        // Verify that the projected property's value has changed
        XCTAssert(person.firstName == "David")
    }
    // :code-block-end:

    func projectionNotificationExample() {
        // :code-block-start: register-a-class-projection-change-listener
        let realm = try! Realm()
        let projectedPerson = realm.objects(ProjectionExample_PersonProjection.self).first(where: { $0.firstName == "Jason" })!
        let token = projectedPerson.observe(keyPaths: ["firstName"], { change in
            switch change {
            case .change(let object, let properties):
                for property in properties {
                    print("Property '\(property.name)' of object \(object) changed to '\(property.newValue!)'")
                }
            case .error(let error):
                print("An error occurred: \(error)")
            case .deleted:
                print("The object was deleted.")
            }
        })

        // Now update to trigger the notification
        try! realm.write {
            projectedPerson.firstName = "David"
        }
        // :code-block-end:
    }
}
// :replace-end:
