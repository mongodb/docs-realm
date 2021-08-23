// open an existing realm
var realm = Realm.GetInstance("/users/caleb/myRealm.realm");

// Create a RealmConfiguration for the *copy*
var config = new RealmConfiguration("/users/caleb/myRealm_copy.realm")
{
    // optionally encrypt it
    EncryptionKey = encryptionKey,
};

// Copy the realm
realm.WriteCopy(config);
