@PersistedName(name = "Blog_Author")
class RealmObjectProperties_User : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var posts: RealmList<RealmObjectProperties_Post> = realmListOf()
}

        realm.write {
            // Query by the remapped class name
            val postsByKermit = query<RealmObjectProperties_Post>()
                .query("@links.Blog_Author.name == $0", "Kermit")
                .find()
