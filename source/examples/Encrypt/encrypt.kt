val key = ByteArray(64)
SecureRandom().nextBytes(key)
val config = RealmConfiguration.Builder()
    .encryptionKey(key)
    .build()

val realm = Realm.getInstance(config)
