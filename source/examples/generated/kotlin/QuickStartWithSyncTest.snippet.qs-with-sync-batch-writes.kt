realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "go grocery shopping"
        status = "Open"
    })
    copyToRealm(Task().apply {
        name = "Exercise at the gym"
        status = "In Progress"
    })
}
