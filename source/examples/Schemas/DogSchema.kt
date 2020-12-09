open class Dog: RealmObject() {
    var name: String = ""
    var age: Int = 0
    var breed: String? = null
    var owner: Person? = null
}
