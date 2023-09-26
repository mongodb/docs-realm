// Open a write transaction
realm.write {
    // Create a new unmanaged Frog object
    val frog = Frog().apply {
        name = "Kermit"
        age = 42
        owner = "Jim Henson"
    }
    // Copy the object to realm to return a managed instance
    copyToRealm(frog)

    // Work with the managed object ...
}
