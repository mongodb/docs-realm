realm.write {
    // Create a Frog object named 'Kermit'
    // Add item to the RealmSet using the add() method
    val frog = copyToRealm(
        Frog().apply {
            name = "Kermit"
            favoriteSnacks.add(Snack().apply { name = "flies" })
        }
    )
    println(frog.favoriteSnacks.first().name) // prints "flies"
}
