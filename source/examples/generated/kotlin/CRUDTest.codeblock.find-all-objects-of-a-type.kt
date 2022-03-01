// fetch all objects of a type as a flow, asynchronously
val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()
val asyncCall: Deferred<Unit> = async {
    frogsFlow.collect { results ->
        when (results) {
            // print out initial results
            is InitialResults<Frog> -> {
                for (frog in results.list) {
                    Log.v("Frog: $frog")
                }
            } else -> {
                // do nothing on changes
            }
        }
    }
}

// fetch all objects of a type as a results collection, synchronously
val frogs: RealmResults<Frog> = realm.query<Frog>().find()
for(frog in frogs) {
    Log.v("Frog: $frog")
}
