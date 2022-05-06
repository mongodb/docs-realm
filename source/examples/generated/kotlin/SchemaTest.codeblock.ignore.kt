class ShoppingCart: RealmObject {
    val _id: Long = Random.nextLong()
    @Ignore
    val items: List<String> = listOf()
}
