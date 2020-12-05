class Dog: RealmObject {
    var name: String = ""
    var age: int = 0
    var breed: String? = null
    @Required
    var owner: Person? = null
}
