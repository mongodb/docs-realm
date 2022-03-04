// delete the first task in the realm
realm.writeBlocking {
    val writeTransactionTasks = realm.query<Task>().find()
    delete(findLatest(writeTransactionTasks[0])!!)
}
