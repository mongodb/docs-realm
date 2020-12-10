open class Dog(
    var name: String = "",
    var puppies: RealmList<String> = RealmList<String>()
): RealmObject()