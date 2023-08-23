class Frog : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> = realmSetOf()
}

class Snack : RealmObject {
    var _id: ObjectId = ObjectId()
    var name: String = ""
}
