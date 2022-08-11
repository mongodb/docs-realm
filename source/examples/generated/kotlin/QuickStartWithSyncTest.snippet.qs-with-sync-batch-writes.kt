// you can also create multiple realm objects within a single write block
realm.writeBlocking {
    copyToRealm(Task().apply {
        name = "Go grocery shopping"
        status = "Open"
        priority = 5
    })
    copyToRealm(Task().apply {
        name = "Exercise at the gym"
        status = "In Progress"
        priority = 2
    })
}
