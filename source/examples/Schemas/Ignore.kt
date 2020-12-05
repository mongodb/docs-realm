class Dog: RealmObject {
    var name: String = ""
    var age: int = 0
    var breed: String? = null
    var owner: Person? = null
    @Ignore
    var misbehavior: String? = null
}
