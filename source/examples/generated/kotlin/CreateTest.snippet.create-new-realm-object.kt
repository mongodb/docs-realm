// Open a write transaction
realm.write {
    // Instantiate a new unmanaged Frog object
    val frog = Frog().apply {
        name = "Kermit"
        age = 42
        owner = "Jim Henson"
    }
    assertFalse(frog.isManaged())

    // Copy the object to the realm to return a managed instance
    copyToRealm(frog)
    assertTrue(frog.isManaged())

    // Work with the managed object ...
}
