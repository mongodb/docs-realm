// :replace-start: {
//   "terms": {
//     "InverseRelationshipExample_": "",
//     "ToManyExample_": "",
//     "ToOneRelationship_": ""
//   }
// }
import RealmSwift

// :code-block-start: inverse-relationship
class InverseRelationshipExample_User: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var _partition: String = ""
    @Persisted var name: String = ""

    // A user can have many tasks.
    @Persisted var tasks: List<InverseRelationshipExample_Task>
}

class InverseRelationshipExample_Task: Object {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var _partition: String = ""
    @Persisted var text: String = ""

    // Backlink to the user. This is automatically updated whenever
    // this task is added to or removed from a user's task list.
    @Persisted(originProperty: "tasks") var assignee: LinkingObjects<InverseRelationshipExample_User>
}
// :code-block-end:

// :code-block-start: to-many-relationship
class ToManyExample_Person: Object {
    @Persisted var name: String = ""
    @Persisted var birthdate: Date = Date(timeIntervalSince1970: 1)

    // A person can have many dogs
    @Persisted var dogs: List<ToManyExample_Dog>
}

class ToManyExample_Dog: Object {
    @Persisted var name: String = ""
    @Persisted var age: Int = 0
    @Persisted var breed: String?
    // No backlink to person -- one-directional relationship
}
// :code-block-end:

// :code-block-start: to-one-relationship
class ToOneRelationship_Person: Object {
    @Persisted var name: String = ""
    @Persisted var birthdate: Date = Date(timeIntervalSince1970: 1)

    // A person can have one dog
    @Persisted var dog: ToOneRelationship_Dog?
}

class ToOneRelationship_Dog: Object {
    @Persisted var name: String = ""
    @Persisted var age: Int = 0
    @Persisted var breed: String?
    // No backlink to person -- one-directional relationship
}
// :code-block-end:

// :replace-end:
