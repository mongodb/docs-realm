class Sushi : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String = ""
    val fishes: RealmList<Fish> = realmListOf<Fish>()
}
