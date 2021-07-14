val config = RealmConfiguration(schema = setOf(Task::class))
val realm = Realm(config)

// fetch objects from a realm as Flowables
CoroutineScope(Dispatchers.Main).launch {
    val flow: Flow<RealmResults<Task>> = realm.objects(Task::class).observe()
    flow.collect { task ->
        println("Task: $task")
    }
}

// write an object to the realm in a coroutine
CoroutineScope(Dispatchers.Main).launch {
    realm.write {
        this.copyToRealm(Task().apply { name = "my task"; status = "Open"})
    }
}
