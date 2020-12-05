open class Dog(
    var name: String = "",
    var puppies: RealmList<String> = RealmList()
): RealmObject()