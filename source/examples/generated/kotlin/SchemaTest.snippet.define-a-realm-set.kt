class Frog : RealmObject {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> =
        realmSetOf<Snack>()
}

class Snack : RealmObject {
    var name: String? = null
}
