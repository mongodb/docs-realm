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
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    
    // A user can have many tasks.
    let tasks = List<InverseRelationshipExample_Task>()
    
    override static func primaryKey() -> String? {
        return "_id"
    }
}

class InverseRelationshipExample_Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var text: String = ""
    
    // Backlink to the user. This is automatically updated whenever
    // this task is added to or removed from a user's task list.
    let assignee = LinkingObjects(fromType: InverseRelationshipExample_User.self, property: "tasks")
    
    override static func primaryKey() -> String? {
        return "_id"
    }
}
// :code-block-end:

// :code-block-start: to-many-relationship
class ToManyExample_Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    
    // A person can have many dogs
    let dogs = List<ToManyExample_Dog>()
}

class ToManyExample_Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    // No backlink to person -- one-directional relationship
}
// :code-block-end:

// :code-block-start: to-one-relationship
class ToOneRelationship_Person: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    
    // A person can have one dog
    @objc dynamic var dog: ToOneRelationship_Dog? = nil
}

class ToOneRelationship_Dog: Object {
    @objc dynamic var name: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var breed: String? = nil
    // No backlink to person -- one-directional relationship
}
// :code-block-end:

// :replace-end:
