realm.write {
    val frog = this.copyToRealm(Frog().apply {
        name = "Kermit"
        age = 45
        species = "Green"
        owner = "Jim"
    })
}
