// Library projects are therefore required to explicitly set their own module.
val libraryConfig =
    SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
        .modules(MyLibraryModule())
        .build()

// Apps can add the library RealmModule to their own schema.
val config =
    SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .modules(Realm.getDefaultModule(), MyLibraryModule())
        .build()