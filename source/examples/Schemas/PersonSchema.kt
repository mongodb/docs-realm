open class Person(
    @PrimaryKey
    var id: Int = 0,
    var name: String = "",
    @LinkingObjects("owner")
    val dogs: RealmResults<Dog>? = null
): RealmObject()
