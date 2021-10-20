val config = RealmConfiguration.with(schema = setOf(Task::class))
val realm = Realm.open(config)

// fetch objects from a realm as Flowables
CoroutineScope(Dispatchers.Main).launch {
    val flow: Flow<RealmResults<Task>> = realm.objects<Task>().observe()
    flow.collect { task ->
        println("Task: $task")
    }
}

// write an object to the realm in a coroutine
CoroutineScope(Dispatchers.Main).launch {
    realm.write {
        copyToRealm(Task().apply { name = "my task"; status = "Open"})
    }
}
