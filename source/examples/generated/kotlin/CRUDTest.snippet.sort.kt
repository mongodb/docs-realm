// sort in descending order, frogs with distinct owners, only the first 5, with convenience methods
val convenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
    realm.query<Frog>("name = $0", "George Washington")
        .sort("age", Sort.DESCENDING).distinct("owner").limit(5).asFlow()
val asyncCallConvenience: Deferred<Unit> = async {
    convenientlyOrganizedFrogs.collect { results ->
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

// sort in descending order, frogs with distinct owners, only the first 5, using RQL
val somewhatLessConvenientlyOrganizedFrogs: Flow<ResultsChange<Frog>> =
    realm.query<Frog>("name = $0 SORT(age DESC) DISTINCT(owner) LIMIT(5)", "George Washington").asFlow()
val asyncCallLessConvenient: Deferred<Unit> = async {
    somewhatLessConvenientlyOrganizedFrogs.collect { results ->
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
