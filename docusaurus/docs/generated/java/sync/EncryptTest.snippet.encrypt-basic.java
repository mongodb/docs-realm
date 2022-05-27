// Generate a key
byte[] key = new byte[64];
new SecureRandom().nextBytes(key);
SyncConfiguration config =
        new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .encryptionKey(key)
        .build();
// Open the encrypted realm
Realm realm = Realm.getInstance(config);
