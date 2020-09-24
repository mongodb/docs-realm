class Person: RealmObject {
    var name: String = ""
    var birthdate: Date = Date(milliseconds: 1)
    var dogs = RealmList<Dog>()
}

class Dog: RealmObject {
    var name: String = ""
    var age: int = 0
    var breed: String? = null
}
