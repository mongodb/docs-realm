val app: App = App.create(YOUR_APP_ID) // Replace with your App ID
runBlocking {
    // Log user in
    val user = app.login(credentials)

    // Work with logged-in user ...

    // Delete the logged-in user from the app
    // and the Atlas App Services server
    user.delete()
}
