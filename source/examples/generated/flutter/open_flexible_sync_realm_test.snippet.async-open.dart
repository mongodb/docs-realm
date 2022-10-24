Configuration config =
    Configuration.flexibleSync(currentUser, [Tricycle.schema]);
Realm fullySyncedRealm = await Realm.open(config);
