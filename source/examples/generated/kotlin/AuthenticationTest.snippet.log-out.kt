val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    // Log user in
    val user = app.login(credentials)

    // Work with logged-in user ...

    // Log user out
    user.logOut()
}
