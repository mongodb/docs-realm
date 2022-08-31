class Item() : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId.create()
    var isComplete: Boolean = false
    var summary: String = ""
    var owner_id: String = ""
    constructor(ownerId: String = "") : this() {
        owner_id = ownerId
    }
}
