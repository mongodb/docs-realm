// Generate a key
// IMPORTANT! This is a silly way to generate a key. It is also never stored.
// For proper key handling please consult:
// * https://developer.android.com/training/articles/keystore.html
// * http://nelenkov.blogspot.dk/2012/05/storing-application-secrets-in-androids.html
byte[] key = new byte[64];
new SecureRandom().nextBytes(key);
RealmConfiguration config = new RealmConfiguration.Builder()
        .encryptionKey(key)
        .build();

// Open the encrypted realm
Realm realm = Realm.getInstance(config);