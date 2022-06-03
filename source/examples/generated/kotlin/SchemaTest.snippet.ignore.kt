class ShoppingCart: RealmObject {
    val _id: ObjectId = ObjectId.create()
    @Ignore
    val items: List<String> = listOf()
}
