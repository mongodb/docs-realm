class Sushi: RealmObject {
    val _id: ObjectId = ObjectId.create()
    val name: String = ""
    val fishes: RealmList<Fish> = listOf()
}
