// Open a write transaction
realm.write {
    // Query Frog type with no filter to return all frog objects
    val frogsLeftInTheRealm = query<Frog>().find()
    delete(frogsLeftInTheRealm)
}
