val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    app.emailPasswordAuth.confirmUser(token, tokenId)
}
