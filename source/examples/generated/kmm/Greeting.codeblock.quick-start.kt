val config = RealmConfiguration.with(schema = setOf(Task::class))
val realm = Realm.open(config)
realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "Do work"
        status = "Open"
    })
}
// all tasks in the realm
val tasks = realm.objects<Task>().query()
// all tasks in the realm
val tasksThatBeginWIthD = realm.objects<Task>().query("name BEGINSWITH $0", "D")
val openTasks = realm.objects<Task>().query("status == $0", "Open")
realm.writeBlocking {
    findLatest(openTasks[0])?.status = "In Progress"
}
realm.writeBlocking {
    findLatest(tasks[0])?.delete()
}
