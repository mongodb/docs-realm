val queryAllFrogs = realm.query<Frog>()
// Returns a RealmResults collection
val allFrogs: RealmResults<Frog> = queryAllFrogs.find()

val asyncQueryAllFrogs = this.query<Frog>() // this: MutableRealm
// Returns a ResultsChange Flow (MUST be called from 'MutableRealm.query()')
val allFrogsFlow = asyncQueryAllFrogs.asFlow()
