// Realm schema version 1 (oldObject)
class MigrationExampleV4_Person : RealmObject {
    var _id: ObjectId = ObjectId()
    var firstName: String = ""
    var lastName: String = ""
    var age: Int = 0
}

// Realm schema version 2 (newObject)
class MigrationExamplev5_Person : RealmObject {
    var _id: String = "" // change property type
    var fullName: String = "" // merge firstName and lastName properties
    var yearsSinceBirth: Int = 0 // rename property
}
