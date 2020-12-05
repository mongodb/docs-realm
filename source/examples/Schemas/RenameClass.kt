@RealmClass(name="Cat")
class Dog: RealmObject {
    var name: String = ""
    var age: int = 0
    var breed: String? = null
    var owner: Person? = null
}
