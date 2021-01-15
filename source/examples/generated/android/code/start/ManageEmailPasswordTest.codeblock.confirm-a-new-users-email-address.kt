        // token and tokenId are query parameters in the confirmation
        // link sent in the confirmation email.
        app.emailPassword.confirmUserAsync(token, tokenId) {
            if (it.isSuccess) {
                Log.i("EXAMPLE", "Successfully confirmed new user.")
            } else {
                Log.e("EXAMPLE", "Failed to register user: ${it.error}")
            }
        }
    }
    expectation.await()
}

@Test
fun resetAUsersPassword() {
    val random = Random()
    val email = "test" + random.nextInt(100000)
    val password = "testtest"
    val expectation = Expectation()
    activity!!.runOnUiThread {
        val appID: String = YOUR_APP_ID // replace this with your App ID
        val app = App(AppConfiguration.Builder(appID).build())
        val token = "token-fake"
        val tokenId = "token-id-fake"
        val newPassword = "newFakePassword"

        // :code-block-start: send-reset-password-email
        app.emailPassword.sendResetPasswordEmailAsync(email) {
            if (it.isSuccess) {
                Log.i("EXAMPLE", "Successfully sent the user a reset password link to $email")
            } else {
                Log.e("EXAMPLE", "Failed to send the user a reset password link to $email: $it.error")
            }
        }