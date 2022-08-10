val app = App.create(YOUR_APP_ID)
runBlocking{
    val credentials = Credentials.anonymous()
    val user = app.login(credentials)

    val config = SyncConfiguration.Builder(user, setOf(Task::class))
        .initialSubscriptions { realm ->
            add(
                realm.query<Task>(
                    "status == $0",
                    "Open"
                ),
                "Open Tasks"
            )
        }
        .build()
    val realm = Realm.open(config)


        realm.writeBlocking {
            copyToRealm(Task().apply {
                name = "Go Jogging"
                status = "Open"
            })
        }

    realm.writeBlocking {
        copyToRealm(Task().apply {
            name = "go grocery shopping"
            status = "Open"
        })
        copyToRealm(Task().apply {
            name = "Exercise at the gym"
            status = "In Progress"
        })
    }

    // all tasks in the realm
    val tasks: RealmResults<Task> = realm.query<Task>().find()


    // tasks in the realm whose name begins with the letter 'D'
    val tasksThatBeginWIthD: RealmResults<Task> =
        realm.query<Task>("name BEGINSWITH $0", "D")
            .find()
    val openTasks: RealmResults<Task> =
        realm.query<Task>("status == $0", "Open")
            .find()

    // change the first task with open status to in progress status
    realm.writeBlocking {
        findLatest(openTasks[0])?.status = "In Progress"
    }

    // delete the first task object in the realm
    realm.writeBlocking {
        val writeTransactionTasks = query<Task>().find()
        delete(writeTransactionTasks.first())
    }

    realm.close()
}
