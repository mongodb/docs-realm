realm.write {
    // The ID of a particular frog can either already exist or be a new ObjectId
    val frogId = ObjectId()
    // If a frog matching the ID exists, update its properties, otherwise create it
    this.copyToRealm(Frog().apply {
        _id = frogId
        name = "Wirt"
        age = 4
        species = "Greyfrog"
        owner = "L'oric"
    }, updatePolicy = UpdatePolicy.ALL)
}
