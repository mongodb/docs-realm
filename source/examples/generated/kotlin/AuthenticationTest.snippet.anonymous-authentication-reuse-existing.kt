runBlocking {
    // Logs in with anonymous user
    val anonUser = app.login(Credentials.anonymous())

    // Creates a new anonymous user
    val otherAnonUser =
        app.login(Credentials.anonymous(reuseExisting = false))
}
