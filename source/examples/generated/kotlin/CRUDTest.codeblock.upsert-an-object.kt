realm.write {
    // fetch a frog from the realm based on some query
    val frog: Frog? =
        this.query<Frog>("name == 'Wirt'").first().find()
    // if the query returned an object, update object from the query
    if (frog != null) {
        frog.age = 4
        frog.species = "Greyfrog"
        frog.owner = "L'oric"
    } else {
        // if the query returned no object, insert a new object with a new primary key.
        this.copyToRealm(Frog().apply {
            _id = Random.nextLong(1000000)
            name = "Wirt"
            age = 4
            species = "Greyfrog"
            owner = "L'oric"
        })
    }
}
