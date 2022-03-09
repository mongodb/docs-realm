// Generate a key
val key = ByteArray(64)
SecureRandom().nextBytes(key)
val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .encryptionKey(key)
        .build()
// Open the encrypted realm
val realm = Realm.getInstance(config)
