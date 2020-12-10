open class Person(
    @PrimaryKey
    var id: Long = 0,
    var name: String = "",
    var dogs: RealmList<Dog> = RealmList()
): RealmObject()

open class Dog(
    var name: String = "",
    var age: Int = 0
): RealmObject() {
    // LinkingObjects must be final (i.e. `val`, not `var`)
    @LinkingObjects("dogs")
    val owners: RealmResults<Person>? = null
}