realm.writeBlocking {
    findLatest(tasks[0])?.delete()
}
