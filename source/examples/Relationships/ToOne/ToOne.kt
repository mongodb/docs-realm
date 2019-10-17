class Person: RealmObject {
    var name: String = ""
    var birthdate: Date = Date(milliseconds: 1)
    var dog: Dog? = null
}

class Dog: RealmObject {
    var name: String = ""
    var age: int = 0
    var breed: String? = null
}
