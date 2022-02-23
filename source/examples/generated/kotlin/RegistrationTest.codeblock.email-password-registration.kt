val app: App = App.create(YOUR_APP_ID)
runBlocking {
    app.emailPasswordAuth.registerUser(email, password)
    // once registered, you can log in with the user credentials
    val user = app.login(Credentials.emailPassword(email, password))
    Log.v("Successfully logged in ${user.identity}")
}
