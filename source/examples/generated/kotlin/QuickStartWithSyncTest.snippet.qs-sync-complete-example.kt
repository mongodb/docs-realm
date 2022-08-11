val app = App.create(YOUR_APP_ID)
runBlocking {
    val credentials = Credentials.anonymous()
    val user = app.login(credentials)

    class Task : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId.create()
        var name: String = ""
        var status: String = "Open"
        var priority: Int = 1
    }

    val config = SyncConfiguration.Builder(user, setOf(Task::class))
        .initialSubscriptions { realm ->
            add(
                realm.query<Task>(
                    "priority > 3",
                    "Open"
                ),
                "High Priority Tasks"
            )
        }
        .build()
    val realm = Realm.open(config)


    // all tasks in the realm
    val tasks: RealmResults<Task> = realm.query<Task>().find()

    // flow.collect() is blocking -- run it in a background context
    val job = CoroutineScope(Dispatchers.Default).launch {
        // create a Flow from the Task collection, then add a listener to the Flow
        val tasksFlow = tasks.asFlow()
        tasksFlow.collect { changes: ResultsChange<Task> ->
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
        copyToRealm(Task().apply {
            name = "Go Jogging"
            status = "Open"
            priority = 2
        })
    }

    realm.writeBlocking {
        copyToRealm(Task().apply {
            name = "Go grocery shopping"
            status = "Open"
            priority = 5
        })
        copyToRealm(Task().apply {
            name = "Exercise at the gym"
            status = "In Progress"
            priority = 2
        })
    }

    // tasks in the realm whose name begins with the letter 'G'
    val tasksThatBeginWIthG: RealmResults<Task> =
        realm.query<Task>("name BEGINSWITH $0", "G")
            .find()
    // tasks in the realm whose status is 'Open'
    val openTasks: RealmResults<Task> =
        realm.query<Task>("status == $0", "Open") // Go Jogging,
            .find()

    // change the first task to in progress status
    realm.writeBlocking {
        findLatest(openTasks[0])?.status = "In Progress"
    }

    // delete the first task object in the realm
    realm.writeBlocking {
        val writeTransactionTasks = query<Task>().find()
        delete(writeTransactionTasks.first())
    }


    job.cancel() // cancel the coroutine containing the listener

    realm.close()
}
