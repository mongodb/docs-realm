val kermitFrog = realm.query<Frog2>("name = 'Kermit'").first().find()
val job = CoroutineScope(Dispatchers.Default).launch {
    kermitFrog?.favoriteSnacks
        ?.asFlow()
        ?.collect() {
            // Listen for changes to the RealmSet
        }
}
