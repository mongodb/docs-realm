class Book() : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId() // Primary key

    var name: String = ""

    @FullText // Marks the property with FTS
    var genre: String = ""
}
