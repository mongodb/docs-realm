// Library projects are therefore required to explicitly set their own module.
SyncConfiguration libraryConfig = new SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
        .modules(new MyLibraryModule())
        .build();

// Apps can add the library RealmModule to their own schema.
SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .modules(Realm.getDefaultModule(), new MyLibraryModule())
        .build();