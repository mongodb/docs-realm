realm.write {
    // fetch 7 frogs of the bullfrog species from the realm
    val frogs: RealmResults<Frog> =
        this.query<Frog>("species == 'bullfrog' LIMIT(7)").find()
    // call delete on the results of a query to delete those objects permanently
    frogs.delete()
}
