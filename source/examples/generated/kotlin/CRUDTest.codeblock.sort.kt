// sort in descending order, frogs with distinct owners, only the first 5, with convenience methods
val convenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
    realm.query<Frog>("name = 'George Washington'")
        .sort("age", Sort.DESCENDING).distinct("owner").limit(5).asFlow()
val asyncCallConvenience: Deferred<Unit> = async {
    convenientlyOrganizedFrogs.collect { change ->
        change.list.forEach { frog ->
            Log.v("Found frog: $frog")
        }
    }
}
asyncCallConvenience.await()
asyncCallConvenience.cancel()

// sort in descending order, frogs with distinct owners, only the first 5, using RQL
val somewhatLessConvenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
    realm.query<Frog>("name = 'George Washington' SORT(age DESC) DISTINCT(owner) LIMIT(5)").asFlow()
val asyncCallLessConvenient: Deferred<Unit> = async {
    somewhatLessConvenientlyOrganizedFrogs.collect { change ->
        change.list.forEach { frog ->
            Log.v("Found frog: $frog")
        }
    }
}
asyncCallLessConvenient.await()
asyncCallLessConvenient.cancel()
