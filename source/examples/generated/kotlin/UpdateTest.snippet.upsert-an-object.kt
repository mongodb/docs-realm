realm.write {
    // Fetch a frog from the realm based on some query
    val frog: Frog? =
        this.query<Frog>("name == 'Wirt'").first().find()
    val frogPrimaryKey = frog?._id ?: ObjectId()
    // If a frog matching the query exists, update its properties, otherwise create it
    this.copyToRealm(Frog().apply {
        _id = frogPrimaryKey
        name = "Wirt"
        age = 4
        species = "Greyfrog"
        owner = "L'oric"
    }, updatePolicy = UpdatePolicy.ALL)
}
