realm.write {
    // Create a Frog object named 'Kermit'
    // with a RealmSet of favorite snacks
    val frog = copyToRealm(
        Frog().apply {
            name = "Kermit"
            favoriteSnacks.add(Snack().apply { name = "Flies" })
            favoriteSnacks.add(Snack().apply { name = "Crickets" })
            favoriteSnacks.add(Snack().apply { name = "Worms" })
        }
    )
    // Query for frogs that have worms as a favorite snack
    val frogs = query<Frog>("favoriteSnacks.name == $0", "Worms").find().first()

    // Query for specific snacks
    val wormsSnack = frog.favoriteSnacks.first { it.name == "Worms" }
}
