@RealmClass(name = "__Person", fieldNamingPolicy = RealmNamingPolicy.PASCAL_CASE)
open class Person(
    var name: String? = null
): RealmObject()