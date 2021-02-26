// configure and open a local realm
val config = RealmConfiguration.Builder()
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()
val realm = Realm.getInstance(config)

// create an reference to a frog
var frog : Frog? = null

// insert a new frog into the database and store it in our reference
realm.executeTransaction { transactionRealm: Realm ->
    frog = transactionRealm.createObject(Frog::class.java)
    frog?.name = "Doctor Cucumber"
    frog?.age = 3
    frog?.species = "Tree Frog"
    frog?.owner = "Greg"
}

// create a listener that logs new changes to the frog
val listener = RealmObjectChangeListener { changedFrog: Frog?,
                                           changeSet: ObjectChangeSet? ->
    if (changeSet!!.isDeleted) {
        Log.i("EXAMPLE", "The frog was deleted")
    } else {
        for (fieldName in changeSet.changedFields) {
            Log.i("EXAMPLE", "Field '$fieldName' changed.")
        }
    }
}

// attach the listener we just created to the frog
frog?.addChangeListener(listener)

// update the frog
realm.executeTransaction { frog?.name = "Ronald" }
