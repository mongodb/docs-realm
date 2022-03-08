val app: App = App.create(YOUR_APP_ID)
runBlocking {
    val user = app.login(Credentials.anonymous())
}
