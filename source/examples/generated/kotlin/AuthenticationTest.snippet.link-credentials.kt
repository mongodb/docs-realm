val app: App = App.create("mytutorialapp-kcavx") // Replace this with your App ID
runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    val user = app.login(Credentials.anonymous()) // logs in with an anonymous user
    // registering an email and password user
    app.emailPasswordAuth.registerUser(email, password)
    // link anonymous user with email password credentials
    user.linkCredentials(Credentials.emailPassword(email, password));
}
