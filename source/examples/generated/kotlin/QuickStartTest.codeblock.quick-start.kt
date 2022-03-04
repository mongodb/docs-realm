val config = RealmConfiguration.Builder()
    .schema(setOf(Task::class))
    .build()
val realm: Realm = Realm.open(config)
realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "Do work"
        status = "Open"
    })
}
// all tasks in the realm
val tasks = realm.query<Task>().find()
// all tasks in the realm
val tasksThatBeginWIthD = realm.query<Task>("name BEGINSWITH $0", "D").find()
val openTasks = realm.query<Task>("status == $0", "Open").find()
realm.writeBlocking {
    findLatest(openTasks[0])?.status = "In Progress"
}
realm.writeBlocking {
    findLatest(tasks[0])?.delete()
}
