class Person: Object {
    dynamic var name: String = ""
    dynamic var birthdate: Date = Date(timeIntervalSince1970: 1)
    let dogs = List<Dog>()
}

class Dog: Object {
    dynamic var name: String = ""
    dynamic var age: Int = 0
    dynamic var breed: String? = nil
}
