class ShoppingCart : RealmObject {
    val _id: ObjectId = ObjectId()

    @Ignore
    val items: List<String> = listOf()
}
