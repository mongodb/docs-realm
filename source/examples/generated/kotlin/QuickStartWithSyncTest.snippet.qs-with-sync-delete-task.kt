// delete the first task object in the realm
realm.writeBlocking {
    val writeTransactionTasks = query<Task>().find()
    delete(writeTransactionTasks.first())
}
