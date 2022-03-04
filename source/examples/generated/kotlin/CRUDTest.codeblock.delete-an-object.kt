realm.write {
    // fetch the frog by primary key value, passed in as argument number 0
    val frog: Frog? =
        this.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
    // call delete on the results of a query to delete the object permanently
    frog?.delete()
}
