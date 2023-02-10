// Create unencrypted realm
runBlocking {
    val unencryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("unencrypted.realm")
        .build()

    // Open the realm and add data to it
    val unencryptedRealm = Realm.open(unencryptedConfig)

    unencryptedRealm.write {
        this.copyToRealm(Frog().apply {
            name = "Kermit"
            age = 45
            species = "Green"
            owner = "Jim"
        })
    }

    // ... Generate encryption key ...

    // Create the encrypted realm
    val encryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("encrypted.realm")
        .encryptionKey(getEncryptionKey())
        .build()

    // Copy data from `unencryptedRealm` to the new realm
    // Data is encrypted as part of the copy process
    unencryptedRealm.writeCopyTo(encryptedConfig)

    // Close the original realm when you're done copying
    unencryptedRealm.close()

    // Open the new encrypted realm
    val encryptedRealm = Realm.open(encryptedConfig)

    // Copied frog object is available in the new realm
    val frog: Frog =
        encryptedRealm.query<Frog>().find().first()
    Log.v("Copied frog: ${frog.name}")

    encryptedRealm.close()
}
