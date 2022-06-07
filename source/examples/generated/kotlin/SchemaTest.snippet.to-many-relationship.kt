class Sushi: RealmObject {
    val _id: ObjectId = ObjectId.create()
    val name: String = ""
    val fishes: List<Fish> = listOf()
}
