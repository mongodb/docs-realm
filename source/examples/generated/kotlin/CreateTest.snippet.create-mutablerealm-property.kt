// Open a write transaction
realm.write {
    // Create a new unmanaged Frog object with a MutableRealmInt property
    val frog = Frog().apply {
        name = "Michigan J. Frog"
        // Set an initial value with MutableRealmInt.create()
        fliesEaten = MutableRealmInt.create(200)
    }
    // Copy the object to realm to return a managed instance
    copyToRealm(frog)
}
