open class Dog: RealmObject() {
    var name: String = ""
    var age: Int = 0
    @Index
    var breed: String? = null
    var owner: Person? = null
}
