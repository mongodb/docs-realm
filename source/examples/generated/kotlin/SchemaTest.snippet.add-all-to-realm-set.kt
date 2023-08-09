realm.write {
    val myFrog = query<Frog>("name == $0", "Kermit").find().first()
    val set = findLatest(myFrog)!!.favoriteSnacks

    val cricketsSnack = copyToRealm(Snack().apply {
        name = "crickets"
    })
    val earthWormsSnack = copyToRealm(Snack().apply {
        name = "earthworms"
    })
    val waxWormsSnack = copyToRealm(Snack().apply {
        name = "waxworms"
    })

    set.addAll(setOf(cricketsSnack, earthWormsSnack, waxWormsSnack))
    }
