realm.write {
    val myFrog: Frog = realm.query<Frog>("name = 'Kermit'").first().find()!!
    val set = findLatest(myFrog)!!.favoriteSnacks

    val cricketsSnack = this.copyToRealm(Snack().apply {
        name = "crickets"
    })
    val earthWormsSnack = this.copyToRealm(Snack().apply {
        name = "earthworms"
    })
    val waxWormsSnack = this.copyToRealm(Snack().apply {
        name = "waxworms"
    })

    set.addAll(setOf(cricketsSnack, earthWormsSnack, waxWormsSnack))
    }
