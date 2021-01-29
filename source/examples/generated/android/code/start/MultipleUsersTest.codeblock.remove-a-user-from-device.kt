app.loginAsync(credentials) {
    if (it.isSuccess) {
        val user = it.get()
        AsyncTask.execute {
            app.removeUser(user)
        }
    } else {
        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
    }
}
