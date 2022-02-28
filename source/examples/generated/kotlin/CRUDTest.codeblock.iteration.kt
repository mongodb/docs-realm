// fetch frogs from the realm as Flowables
val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()

// iterate through the flow with collect, printing each item
val frogsObserver: Deferred<Unit> = async {
    frogsFlow.collect { frog ->
        Log.v("Frog: $frog")
    }
}

// ... some time later, cancel the flow so you can safely close the realm
frogsObserver.cancel()
realm.close()
