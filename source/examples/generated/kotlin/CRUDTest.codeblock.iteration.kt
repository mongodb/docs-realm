// fetch frogs from the realm as Flowables
val frogsFlow: Flow<RealmResults<Frog>> = realm.query<Frog>().asFlow()

// iterate through the flow with collect, printing each item
frogsFlow.collect { frog ->
    Log.v("Frog: $frog")
}
