val app = App.create(YOUR_APP_ID)
runCatching {
    app.login(Credentials.anonymous())
}.onSuccess {
    Log.v("Successfully logged in")
}.onFailure { ex: Throwable ->
    when (ex) {
        is InvalidCredentialsException -> {
            Log.v("Invalid username or password. Please try again.")
        }
        is ConnectionException -> {
            Log.e(ex.toString())
        }
        else -> {
            Log.e(ex.toString())
        }
    }
}
