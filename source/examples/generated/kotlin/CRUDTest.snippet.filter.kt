// Find frogs where name is 'Michigan J. Frog'
val michiganFrogs: RealmResults<Frog> =
    realm.query<Frog>("name = $0", "Michigan J. Frog").find()

// Find frogs where age > 3 AND species is 'Green'
val oldGreenFrogs: RealmResults<Frog> =
    realm.query<Frog>("age > $0 AND species = $1", 3, "green" ).find()

