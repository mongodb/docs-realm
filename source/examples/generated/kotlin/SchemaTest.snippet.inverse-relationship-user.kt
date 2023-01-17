class User: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    lateinit var name: String
    val posts: RealmResults<Post>? = null
}
