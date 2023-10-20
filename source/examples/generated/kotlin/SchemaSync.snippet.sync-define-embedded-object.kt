class _Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // Embed a single object (MUST be optional)
    var favoritePond: Pond? = null
}

class _Forest : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Embed multiple objects (can have many ponds)
    var forestPonds: RealmList<Pond> = realmListOf()
}

class Pond : EmbeddedRealmObject {
    var name: String? = null
}
