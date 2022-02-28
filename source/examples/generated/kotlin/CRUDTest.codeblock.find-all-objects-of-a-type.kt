// fetch all objects of a type as a flow, asynchronously
val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()
val asyncCall: Deferred<Unit> = async {
    frogsFlow.collect { change ->
        for (frog in change.list) {
            Log.v("Frog: $frog")
        }
    }
}

// fetch all objects of a type as a results collection, synchronously
val frogs: RealmResults<Frog> = realm.query<Frog>().find()
for(frog in frogs) {
    Log.v("Frog: $frog")
}
