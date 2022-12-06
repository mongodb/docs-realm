// open an existing realm
val originalConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
    .name("original-realm")
    .build()
val originalRealm = Realm.open(originalConfig)

// Create a RealmConfiguration for the copy
val copyConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
    .name("copy-realm")
    .build()

// Make sure the file doesn't already exist
Realm.deleteRealm(copyConfig)

// Copy the realm
originalRealm.writeCopyTo(copyConfig)
