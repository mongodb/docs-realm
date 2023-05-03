val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    val authChanges = mutableSetOf<AuthenticationChange>()
    // flow.collect() is blocking -- for this example we run it in a background context
    val job = CoroutineScope(Dispatchers.Default).launch {
        // Create a Flow of AuthenticationChange objects
        app.authenticationChangeAsFlow().collect() { change: AuthenticationChange ->
            when (change) {
                is LoggedIn -> authChanges.add(change)
                is LoggedOut -> authChanges.add(change)
                is Removed -> authChanges.add(change)
            }
        }
    }
    // After logging in, you should see AuthenticationChange is LoggedIn
    val user = app.login(Credentials.emailPassword(email, password))
    if (authChanges.first() is LoggedIn) {
        Log.v("User ${authChanges.first().user} is logged in")
    }
    authChanges.clear()
    // After logging out, observe the AuthenticationChange
    user.logOut()
    if (authChanges.first() is LoggedOut) {
        Log.v("User ${authChanges.first().user} is logged out")
    }
    job.cancel()
}
