// Open a write transaction
realm.write {
    // Create a new unmanaged Frog object with to-one relationship with a Realm object
    val frog = Frog().apply {
        name = "Kermit"
        age = 12
        favoritePond = Pond().apply { name = "Picnic Pond" }
        bestFriend = Frog().apply { name = "Froggy Jay" }
    }
    // Copy all objects to realm to return managed instances
    copyToRealm(frog)
}
