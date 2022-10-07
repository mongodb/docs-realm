val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    val user = app.login(credentials)
    // use the user object ...

    // later, delete the user object
    user.delete() // regardless of which provider you used to login, you can logout using `delete()`
}
