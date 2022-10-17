val cricketsSnack = this.copyToRealm(Snack().apply {
    name = "crickets"
})
val earthWormsSnack = this.copyToRealm(Snack().apply {
    name = "earth worms"
})
val waxWormsSnack = this.copyToRealm(Snack().apply {
    name = "wax worms"
})

set.addAll(setOf(cricketsSnack,earthWormsSnack,waxWormsSnack))
