val kermitFrog = realm.query<Frog>("name = $0", "Kermit").find().first()

val job = launch(Dispatchers.Default) {
    kermitFrog.favoriteSnacks
        .asFlow()
        .collect {
            // Listen for changes to the RealmSet
        }
}
