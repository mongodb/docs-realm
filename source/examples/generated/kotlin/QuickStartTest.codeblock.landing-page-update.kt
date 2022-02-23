val config = RealmConfiguration.Builder()
    .schema(setOf(Frog::class))
    .build()
val realm = Realm.open(config)
// start a write transaction
realm.writeBlocking {
    // get a frog from the database to update
    val frog = query<Frog>()
        .query("name == $0 LIMIT(1)", "Benjamin Franklin").first().find()
    // change the frog's name
    frog?.name = "George Washington"
    // change the frog's species
    frog?.species = "American bullfrog"
} // when the transaction completes, the frog's name and species
// are updated in the database
