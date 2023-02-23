runBlocking {
    // Create the unencrypted realm
    val unencryptedConfig = RealmConfiguration.Builder(setOf(Toad::class))
        .name("unencrypted.realm")
        .build()

    // Open the realm and add data to it
    val unencryptedRealm = Realm.open(unencryptedConfig)

    unencryptedRealm.write {
        this.copyToRealm(Toad().apply {
            name = "Kermit"
        })
    }

    // ... Generate encryption key ...

    // Create the encrypted realm
    val encryptedConfig = RealmConfiguration.Builder(setOf(Toad::class))
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

    // Copied Toad object is available in the new realm
    val toad: Toad =
        encryptedRealm.query<Toad>().find().first()
    Log.v("Copied Toad: ${toad.name}")

    encryptedRealm.close()
}
