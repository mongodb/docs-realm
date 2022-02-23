realm.writeBlocking {
    findLatest(openTasks[0])?.status = "In Progress"
}
