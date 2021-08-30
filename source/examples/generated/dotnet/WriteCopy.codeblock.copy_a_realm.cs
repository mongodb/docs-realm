// open an existing realm
var realm = Realm.GetInstance("myRealm.realm");

// Create a RealmConfiguration for the *copy*
var config = new RealmConfiguration("myRealm_copy.realm");
// Make sure the file doesn't already exist
Realm.DeleteRealm(config);

// Copy the realm
realm.WriteCopy(config);

// Want to know where the copy is?
var locationOfCopy = config.DatabasePath;
