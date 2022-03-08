val config = RealmConfiguration.Builder(schema = setOf(Task::class))
    .build()
val realm: Realm = Realm.open(config)
realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "Do work"
        status = "Open"
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
// delete the first task in the realm
realm.writeBlocking {
    val writeTransactionTasks = query<Task>().find()
    delete(writeTransactionTasks.first())
}
