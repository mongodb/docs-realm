open class Cat: RealmObject() {
    var rivals: RealmList<Dog> = RealmList<Dog>()
}
