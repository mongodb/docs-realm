// Generate a key
// IMPORTANT! This is a silly way to generate a key. It is also never stored.
// For proper key handling please consult:
// * https://developer.android.com/training/articles/keystore.html
// * http://nelenkov.blogspot.dk/2012/05/storing-application-secrets-in-androids.html
val key = ByteArray(64)
SecureRandom().nextBytes(key)
val config = RealmConfiguration.Builder()
    .encryptionKey(key)
    .build()

// Open the encrypted realm
val realm = Realm.getInstance(config)
