taskApp.emailPassword.registerUserAsync(username, password) {
    // re-enable the buttons after user registration returns a result
    createUserButton.isEnabled = true
    loginButton.isEnabled = true
    if (!it.isSuccess) {
        onLoginFailed("Could not register user.")
        Log.e(TAG(), "Error: ${it.error}")
    } else {
        Log.i(TAG(), "Successfully registered user.")
        // when the account has been created successfully, log in to the account
        login(false)
    }
}