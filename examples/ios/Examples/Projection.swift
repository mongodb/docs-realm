// :replace-start: {
//   "terms": {
//     "ProjectionExample_": ""
//   }
// }

import XCTest
import RealmSwift

// :code-block-start: models
class ProjectionExample_Person: Object {
    @Persisted var firstName = ""
    @Persisted var lastName = ""
    @Persisted var address: ProjectionExample_Address?
    @Persisted var friends = List<ProjectionExample_Person>()
}

class ProjectionExample_Address: EmbeddedObject {
    @Persisted var city: String = ""
    @Persisted var country = ""
}
// :code-block-end:

// :code-block-start: declare-projection
class ProjectionExample_PersonProjection: Projection<ProjectionExample_Person> {
    @Projected(\ProjectionExample_Person.firstName) var firstName // Passthrough from original object
    @Projected(\ProjectionExample_Person.address?.city) var homeCity // Rename and access embedded object property through keypath
    @Projected(\ProjectionExample_Person.friends.projectTo.firstName) var firstFriendsName: ProjectedList<String> // Collection mapping
}
// :code-block-end:

class ProjectionExample: XCTestCase {
    override func setUp() {
        Realm.Configuration.defaultConfiguration = Realm.Configuration(inMemoryIdentifier: "ProjectionExample")
        let realm = try! Realm()

        let jason = ProjectionExample_Person(value: ["firstName": "Jason",
                                                     "lastName": "Bourne",
                                                     "address": [
                                                        "city": "Zurich",
                                                        "country": "Switzerland"]])
        let marie = ProjectionExample_Person(value: ["firstName": "Marie",
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

        // :code-block-start: retrieve-data-through-projection
        // Retrieve all projections of the given type `PersonProjection`
        let people = realm.objects(ProjectionExample_PersonProjection.self)
        // Use projection data in your view
        print(people.first?.firstName)
        print(people.first?.homeCity)
        print(people.first?.firstFriendsName)
        // :code-block-end:
        // :code-block-start: change-projection-in-a-write
        // Retrieve all projections of the given type `PersonProjection`
        // and filter for the first projection where the `firstName` property
        // value is "Jason"
        let person = realm.objects(ProjectionExample_PersonProjection.self).first(where: { $0.firstName == "Jason" })!
        // :hide-start:
        XCTAssert(person.firstName == "Jason")
        XCTAssert(person.homeCity == "Zurich")
        // :hide-end:
        // Update projection property in a write transaction
        try! realm.write {
            person.firstName = "David"
        }
        // :code-block-end:
        XCTAssert(person.firstName == "David")
    }
    // :code-block-start: test-with-projection
    func testWithProjection() {
        let realm = try! Realm()
        // Create a Realm object, populate it with values
        let jasonBourne = ProjectionExample_Person(value: ["firstName": "Jason",
                                                           "lastName": "Bourne",
                                                           "address": [
                                                            "city": "Zurich",
                                                            "country": "Switzerland"]])
        try! realm.write {
            realm.add(jasonBourne)
        }

        // Retrieve all projections of the given type `PersonProjection`
        // and filter for the first projection where the `firstName` property
        // value is "Jason"
        let person = realm.objects(ProjectionExample_PersonProjection.self).first(where: { $0.firstName == "Jason" })!
        // Verify that we have the correct PersonProjection
        XCTAssert(person.firstName == "Jason")
        // See that `homeCity` exists as a projection property
        // Although it is not on the object model
        XCTAssert(person.homeCity == "Zurich")

        // Change a value on the projection
        try! realm.write {
            person.firstName = "David"
        }

        // Verify that the projected value has changed
        XCTAssert(person.firstName == "David")
    }
    // :code-block-end:

    func projectionNotificationExample() {
        // :code-block-start: register-a-projection-change-listener
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
