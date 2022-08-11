// change the first task to in progress status
realm.writeBlocking {
    findLatest(openTasks[0])?.status = "In Progress"
}
