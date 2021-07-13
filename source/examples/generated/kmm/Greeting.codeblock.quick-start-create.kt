realm.writeBlocking {
    this.copyToRealm(Task().apply {
        name = "Do work"
        status = "Open"
    })
}
