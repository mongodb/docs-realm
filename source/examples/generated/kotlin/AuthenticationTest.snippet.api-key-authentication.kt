val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking { // use runBlocking sparingly -- it can delay UI interactions
    val user = app.login(Credentials.apiKey(key))
}
