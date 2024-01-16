// Get a Flow of all frogs in the database
val allFrogsQuery = realm.query<ExampleRealmObject_Frog>()
val frogsFlow: Flow<ResultsChange<ExampleRealmObject_Frog>> = allFrogsQuery.asFlow()

// Iterate through the Flow with 'collect()'
val frogsObserver: Deferred<Unit> = async {
    frogsFlow.collect { results ->
        when (results) {
            is InitialResults<ExampleRealmObject_Frog> -> {
                for (frog in results.list) {
                    Log.v("Frog: $frog")
                }
            }

            else -> {
                // No-op
            }
        }
    }
}

// ... Later, cancel the Flow, so you can safely close the database
frogsObserver.cancel()
realm.close()
