open class Cat: RealmObject() {
    var friends: RealmList<Cat> = RealmList<Cat>()
}
