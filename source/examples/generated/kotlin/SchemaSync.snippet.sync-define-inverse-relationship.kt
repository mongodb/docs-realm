class _Pond : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    // Backlink to the `Frog` that has this `Pond` as its favorite
    val frog: RealmResults<_Frog> by backlinks(_Frog::favoritePonds)
}
class _Frog : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var age: Int? = null
    // To-many relationship (can have many ponds)
    var favoritePonds: RealmList<_Pond> = realmListOf()
}
