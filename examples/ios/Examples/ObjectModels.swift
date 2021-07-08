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
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var name = ""
    @Persisted var breed: String?
    @Persisted var dateOfBirth = Date()
}
// :code-block-end:

// :code-block-start: optional-required-properties
class OptionalRequiredPropertyExample_Person: Object {
    // Required string property
    @Persisted var name = ""

    // Optional string property
    @Persisted var address: String?

    // Required numeric property
    @Persisted var ageYears = 0

    // Optional numeric property
    @Persisted var heightCm: Float?
}
// :code-block-end:

// :code-block-start: specify-a-primary-key
class ObjectModelsExamples_Project: Object {
    @Persisted(primaryKey: true) var id = 0
    @Persisted var name = ""
}
// :code-block-end:

// :code-block-start: index-a-property
class ObjectModelsExamples_Book: Object {
    @Persisted var priceCents = 0
    @Persisted(indexed: true) var title = ""
}
// :code-block-end:

// :code-block-start: ignore-a-property
class ObjectModelsExamples_Person: Object {
    // If some properties are marked as @Persisted,
    // any properties that do not have the @Persisted
    // annotation are automatically ignored.
    var tmpId = 0

    // The @Persisted properties are managed
    @Persisted var firstName = ""
    @Persisted var lastName = ""

    // Read-only properties are automatically ignored
    var name: String {
        return "\(firstName) \(lastName)"
    }

    // If you mix the pre-10.10 property declaration
    // syntax `@objc dynamic` with the 10.10+ @Persisted
    // annotation within a class, `@objc dynamic`
    // properties are ignored.
    @objc dynamic var email = ""
}
// :code-block-end:

// :code-block-start: realm-object-enum
// Define the enum
enum ObjectModelsExamples_TaskStatusEnum: String, PersistableEnum {
    case notStarted
    case inProgress
    case complete
}

// To use the enum:
class ObjectModelsExamples_Task: Object {
    @Persisted var name: String = ""
    @Persisted var owner: String?

    // Required enum property
    @Persisted var status = ObjectModelsExamples_TaskStatusEnum.notStarted // :emphasize:

    // Optional enum property
    @Persisted var optionalTaskStatusEnumProperty: ObjectModelsExamples_TaskStatusEnum? // :emphasize:
}
// :code-block-end:

class ObjectModelsExamples_MyModel: Object {
    @Persisted var someProperty = 0
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
