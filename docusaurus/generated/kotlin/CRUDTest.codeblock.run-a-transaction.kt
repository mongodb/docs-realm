realm.write {
    // create a frog object in the realm
    val frog = this.copyToRealm(Frog().apply {
        name = "Kermit"
        age = 45
        species = "Green"
        owner = "Jim"
    })

    // update the frog
    frog.age = frog.age + 1

    // get all frogs that belong to Jim
    val jimsFrogs = this.query<Frog>("owner == 'Jim'").find()

    // give all of Jim's frogs to Brian
    jimsFrogs.forEach {
        it.owner = "Brian"
    }
}
