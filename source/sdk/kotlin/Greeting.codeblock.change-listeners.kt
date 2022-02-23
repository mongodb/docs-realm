val config = RealmConfiguration.with(schema = setOf(Task::class))
val realm = Realm.open(config)

// fetch objects from a realm as Flowables
CoroutineScope(Dispatchers.Main).launch {
    val flow: Flow<RealmResults<Task>> = realm.query<Task>().asFlow()
    flow.collect { task ->
        Log.v("Task: $task")
    }
}

// write an object to the realm in a coroutine
CoroutineScope(Dispatchers.Main).launch {
    realm.write {
        copyToRealm(Task().apply { name = "my task"; status = "Open"})
    }
}
