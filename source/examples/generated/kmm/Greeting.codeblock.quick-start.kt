val config = RealmConfiguration(schema = setOf(Task::class))
val realm = Realm(config)
realm.writeBlocking {
    this.copyToRealm(Task().apply {
        name = "Do work"
        status = "Open"
    })
}
// all tasks in the realm
val tasks = realm.objects<Task>().query()
// all tasks in the realm
val tasksThatBeginWIthD = realm.objects<Task>().query("name BEGINSWITH $0'", "D")
val openTasks = realm.objects<Task>().query("status == $0", "Open")
realm.writeBlocking {
    openTasks[0].status = "In Progress"
}
realm.writeBlocking {
    tasks[0].delete()
}
