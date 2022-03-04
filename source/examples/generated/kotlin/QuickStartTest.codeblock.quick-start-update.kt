// change the first task with open status to in progress status
realm.writeBlocking {
    findLatest(openTasks[0])?.status = "In Progress"
}
