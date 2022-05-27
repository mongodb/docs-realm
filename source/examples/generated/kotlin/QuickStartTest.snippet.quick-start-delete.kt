// delete the first task in the realm
realm.writeBlocking {
    val writeTransactionTasks = query<Task>().find()
    delete(writeTransactionTasks.first())
}
