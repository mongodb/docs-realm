
val app = App.create(YOUR_APP_ID)

runBlocking {
    val credentials = Credentials.anonymous()
    val user = app.login(credentials)


    // create a SyncConfiguration
    val config = SyncConfiguration.Builder(
        user,
        setOf(Item::class)
    ) // the SyncConfiguration defaults to Flexible Sync, if a Partition is not specified
        .initialSubscripti.ons { realm ->
            add(
                realm.query<Item>(
                    "owner_id == $0", // owner_id == the logged in user
                    user.id
                ),
                "User's Items"
            )
        }
        .build()
    val realm = Realm.open(config)
}


val config = RealmConfiguration.Builder(schema = setOf(Item::class))
    .build()
val realm: Realm = Realm.open(config)

// all items in the realm
val items: RealmResults<Item> = realm.query<Item>().find()


// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    // create a Flow from the Item collection, then add a listener to the Flow
    val itemsFlow = items.asFlow()
    itemsFlow.collect { changes: ResultsChange<Item> ->
        when (changes) {
            // UpdatedResults means this change represents an update/insert/delete operation
            is UpdatedResults -> {
                changes.insertions // indexes of inserted objects
                changes.insertionRanges // ranges of inserted objects
                changes.changes // indexes of modified objects
                changes.changeRanges // ranges of modified objects
                changes.deletions // indexes of deleted objects
                changes.deletionRanges // ranges of deleted objects
                changes.list // the full collection of objects
            }
            else -> {
                // types other than UpdatedResults are not changes -- ignore them
            }
        }
    }
}

realm.writeBlocking {
    copyToRealm(Item().apply {
        summary = "Do the laundry"
        isComplete = false
    })
}

// items in the realm whose name begins with the letter 'D'
val itemsThatBeginWIthD: RealmResults<Item> =
    realm.query<Item>("summary BEGINSWITH $0", "D")
        .find()
//  todo items that have not been completed yet
val incompleteItems: RealmResults<Item> =
    realm.query<Item>("isComplete == false")
        .find()
// change the first item with open status to complete to show that the todo item has been done
realm.writeBlocking {
    findLatest(incompleteItems[0])?.isComplete = true
}
// delete the first item in the realm
realm.writeBlocking {
    val writeTransactionItems = query<Item>().find()
    delete(writeTransactionItems.first())
}
