val customCredentials = Credentials.customFunction(
    payload = mapOf("username" to "bob")
)

// Pass the generated credential to app.login()
val currentUser = app.login(customCredentials)
