realm.write {
    val myFrog = query<Frog>("name == $0", "Kermit").find().first()
    val set = findLatest(myFrog)!!.favoriteSnacks

    val cricketsSnack2 = copyToRealm(Snack2().apply {
        name = "crickets"
    })
    val earthWormsSnack2 = copyToRealm(Snack2().apply {
        name = "earthworms"
    })
    val waxWormsSnack2 = copyToRealm(Snack2().apply {
        name = "waxworms"
    })

    set.addAll(setOf(cricketsSnack2, earthWormsSnack2, waxWormsSnack2))
    }
