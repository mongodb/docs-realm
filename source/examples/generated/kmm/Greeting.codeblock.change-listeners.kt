val config = RealmConfiguration(schema = setOf(Task::class))
val realm = Realm(config)
// fetch objects from a realm as Flowables
val tasks = realm.objects(Task::class).observe()
tasks.map { task -> print("task: $task") }

// write an object to the realm in a coroutine
runBlocking {
    launch(Dispatchers.Unconfined) {
        realm.write {
            this.copyToRealm(Task().apply { name = "my task"; status = "Open"})
        }
    }
}
