realm.write {
    val myFrog = realm.query<Frog>("name == $0", "Kermit").find().first()
    val snackSet = findLatest(myFrog)!!.favoriteSnacks

    // Remove the Flies snack from the set
    val fliesSnack = snackSet.first { it.name == "Flies" }
    snackSet.remove(fliesSnack)

    // Remove all snacks from the set
    val allSnacks = findLatest(myFrog)!!.favoriteSnacks
    snackSet.removeAll(allSnacks)
}
