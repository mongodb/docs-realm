// fetch all objects of a type as a flow, asynchronously
val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()

// fetch all objects of a type as a results collection, synchronously
val frogs: RealmResults<Frog> = realm.query<Frog>().find()
