val creds = Credentials.emailPassword(username, password)
taskApp.loginAsync(creds) {
    // re-enable the buttons after user login returns a result
    loginButton.isEnabled = true
    createUserButton.isEnabled = true
    if (!it.isSuccess) {
        onLoginFailed(it.error.message ?: "An error occurred.")
    } else {
        onLoginSuccess()
    }
}