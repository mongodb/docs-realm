class Post: RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    lateinit var title: String
    val user: RealmResults<User> by backlinks(User::posts)
}
