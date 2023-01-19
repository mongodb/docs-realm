class Movie : RealmObject {
    @Index
    val _id: ObjectId = ObjectId()
    val starring: List<String> = listOf()
}
