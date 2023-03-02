realm.write {
    // Create a Frog object named 'Kermit' that will have a RealmSet of favorite snacks
    val frog = this.copyToRealm(Frog().apply {
        name = "Kermit"
    })
    // Get the RealmSet of favorite snacks from the Frog object we just created
    val set = frog.favoriteSnacks

    // Create a Snack object for the Frog to add to Kermit's favorite snacks
    val fliesSnack = this.copyToRealm(Snack().apply {
        name = "flies"
    })

    // Add the flies to the RealmSet of Kermit's favorite snacks
    set.add(fliesSnack)
}
