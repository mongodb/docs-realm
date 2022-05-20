realm.write {
    // fetch a frog from the realm by primary key
    val frog: Frog? =
        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
    // modify the frog's age in the write transaction to persist the new age to the realm
    frog?.age = 42
}
