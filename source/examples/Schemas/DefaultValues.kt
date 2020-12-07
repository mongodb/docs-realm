class Dog: RealmObject() {
    var name: String = ""
    var age: Int = 0
    var breed: String? = "potato"
    var owner: Person? = null
}
