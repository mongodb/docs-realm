val set = frog.favoriteSnacks // get the RealmSet field from the object we just created

val fliesSnack = this.copyToRealm(Snack().apply {
    name = "flies"
})

set.add(fliesSnack)
