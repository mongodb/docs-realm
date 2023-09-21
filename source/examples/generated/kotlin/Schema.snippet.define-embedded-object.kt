// Implements `EmbeddedRealmObject` interface
class Forest : EmbeddedRealmObject {
    // Cannot have a primary key
    var id: ObjectId = ObjectId()
    var name: String = ""
}
