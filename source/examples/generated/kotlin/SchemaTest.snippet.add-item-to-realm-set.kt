// create a Frog object that will have a RealmSet of favorite snacks
val frog = this.copyToRealm(Frog().apply {
    name = "Kermit"
})
val set = frog.favoriteSnacks // get the RealmSet field from the object we just created

val fliesSnack = this.copyToRealm(Snack().apply {
    name = "flies"
})

set.add(fliesSnack) // Add the flies to the set of Kermit's favorite snacks
