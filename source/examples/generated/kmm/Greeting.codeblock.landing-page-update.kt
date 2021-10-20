val config = RealmConfiguration.with(schema = setOf(Frog::class))
val realm = Realm.open(config)
// start a write transaction
realm.writeBlocking {
    // get a frog from the database to update
    val frog = this.objects(Frog::class)
        .query("name == $0 LIMIT(1)", "Benjamin Franklin")
    // change the frog's name
    frog[0].name = "George Washington"
    // change the frog's species
    frog[0].species = "American bullfrog"
} // when the transaction completes, the frog's name and species
// are updated in the database
