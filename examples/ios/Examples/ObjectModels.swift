// :replace-start: {
//   "terms": {
//     "ObjectModelsExamples_": "",
//     "OptionalRequiredPropertyExample_": ""
//   }
// }
import XCTest
import RealmSwift

// :code-block-start: define-a-model
// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
class ObjectModelsExamples_Dog: Object {
    @objc dynamic var _id = ObjectId.generate()
    @objc dynamic var name = ""
    @objc dynamic var breed: String?
    @objc dynamic var dateOfBirth = Date()

    override static func primaryKey() -> String? {
        return "_id"
    }
}
// :code-block-end:

// :code-block-start: optional-required-properties
class OptionalRequiredPropertyExample_Person: Object {
    // Required string property
    @objc dynamic var name = ""

    // Optional string property
    @objc dynamic var address: String?

    // Required numeric property
    @objc dynamic var ageYears = 0

    // Optional numeric property
    let heightCm = RealmOptional<Float>()
}
// :code-block-end:

// :code-block-start: specify-a-primary-key
class ObjectModelsExamples_Project: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""

    // Return the name of the primary key property
    override static func primaryKey() -> String? {
        return "id"
    }
}
// :code-block-end:

// :code-block-start: index-a-property
class ObjectModelsExamples_Book: Object {
    @objc dynamic var priceCents = 0
    @objc dynamic var title = ""

    // Return a list of indexed property names
    override static func indexedProperties() -> [String] {
        return ["title"]
    }
}
// :code-block-end:

// :code-block-start: ignore-a-property
class ObjectModelsExamples_Person: Object {
    @objc dynamic var tmpId = 0
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // Return a list of ignored property names
    override static func ignoredProperties() -> [String] {
        return ["tmpId"]
    }
}
// :code-block-end:

// :code-block-start: realm-object-enum
// Define the enum
@objc enum ObjectModelsExamples_TaskStatusEnum: Int, RealmEnum {
    case notStarted = 1
    case inProgress = 2
    case complete = 3
}

// To use the enum:
class ObjectModelsExamples_Task: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?

    // Required enum property
    @objc dynamic var status = ObjectModelsExamples_TaskStatusEnum.notStarted // :emphasize:

    // Optional enum property
    let optionalTaskStatusEnumProperty = RealmOptional<ObjectModelsExamples_TaskStatusEnum>() // :emphasize:
}
// :code-block-end:

class ObjectModelsExamples_MyModel: Object {
    @objc dynamic var someProperty = 0
}

class ObjectModels: XCTestCase {
    func testGenericCollectionFunc() {
        // :code-block-start: generic-collection
        func operateOn<C: RealmCollection>(collection: C) {
            // Collection could be either Results or List
            print("operating on collection containing \(collection.count) objects")
        }
        // :code-block-end:
    }

    func testAnyRealmCollection() {
        // :code-block-start: any-realm-collection
        class ViewController {
        //    let collection: RealmCollection
        //                    ^
        //                    error: protocol 'RealmCollection' can only be used
        //                    as a generic constraint because it has Self or
        //                    associated type requirements
        //
        //    init<C: RealmCollection>(collection: C) where C.ElementType == ObjectModelsExamples_MyModel {
        //        self.collection = collection
        //    }

            let collection: AnyRealmCollection<ObjectModelsExamples_MyModel>

            init<C: RealmCollection>(collection: C) where C.ElementType == ObjectModelsExamples_MyModel {
                self.collection = AnyRealmCollection(collection)
            }
        }
        // :code-block-end:
    }
}

// :replace-end:
