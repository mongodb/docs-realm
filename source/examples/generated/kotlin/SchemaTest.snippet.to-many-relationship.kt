class Sushi: RealmObject {
    val _id: Long = Random.nextLong()
    val name: String = ""
    val fishes: List<Fish> = listOf()
}
