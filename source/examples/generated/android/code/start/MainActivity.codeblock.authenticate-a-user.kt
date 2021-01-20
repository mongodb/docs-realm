val credentials: Credentials = Credentials.anonymous()

app.loginAsync(credentials) {
    if (it.isSuccess) {
        Log.v("QUICKSTART", "Successfully authenticated anonymously.")
        val user: User? = app.currentUser()
        // interact with realm using your user object here
    } else {
        Log.e("QUICKSTART", "Failed to log in. Error: ${it.error}")
    }
}