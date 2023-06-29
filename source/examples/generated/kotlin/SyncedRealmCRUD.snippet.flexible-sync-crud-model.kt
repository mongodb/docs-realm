class Car : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var ownerId: String = ""
    var make: String = ""
    var model: String = ""
    var miles: Int = 0
}
