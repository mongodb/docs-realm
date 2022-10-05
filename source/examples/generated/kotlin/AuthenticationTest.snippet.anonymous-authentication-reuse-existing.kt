runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    // logs in with an existing anonymous user, as long as the user hasn't logged out
    val user = app.login(Credentials.anonymous(reuseExisting = true))
}
