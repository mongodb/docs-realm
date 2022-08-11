// create a new task object
realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "Go Jogging"
        status = "Open"
        priority = 2
    })
}
