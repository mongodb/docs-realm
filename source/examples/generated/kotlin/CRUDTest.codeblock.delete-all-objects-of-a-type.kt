realm.write {
    // fetch all frogs from the realm
    val frogs: RealmResults<Frog> = this.query<Frog>().find()
    // call delete on the results of a query to delete those objects permanently
    frogs.delete()
}
