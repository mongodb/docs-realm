// Open an existing realm
Realm realm = await Realm.GetInstanceAsync(syncConfiguration);

// Create a RealmConfiguration for the *copy*
RealmConfiguration copiedRealmCofiguration =
    new RealmConfiguration("copy.realm");

// Make sure an existing copy hasn't already been created...
Realm.DeleteRealm(copiedRealmCofiguration);
// ...and then make a copy
realm.WriteCopy(copiedRealmCofiguration);

// You can find the new file location with DatabasePath:
var fileLocation = copiedRealmCofiguration.DatabasePath;
