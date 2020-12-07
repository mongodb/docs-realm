open class Dog: RealmObject() {
    var name: String = ""
    var age: Int = 0
    var breed: String? = null
    @Required
    var owner: Person? = null
}
