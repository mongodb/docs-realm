class Frog : RealmObject {
    var name: String = ""
    var favoriteSnacks: RealmSet<Snack> = realmSetOf<Snack>()  // realmSetOf(Snack()) // RealmSet<Snack>();
}

class Snack : RealmObject {
    var name: String? = null
}
