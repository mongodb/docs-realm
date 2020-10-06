let app = App(id: YOUR_REALM_APP_ID)
let client = app.emailPasswordAuth

let email = "forgot.my.password@example.com"
// If Realm app password reset mode is "Send a password reset email",
// we can do so here:
client.sendResetPasswordEmail(email, completion: {(error) in
    guard error == nil else {
        print("Reset password email not sent: \(error!.localizedDescription)")
        return
    }
    print("Password reset email sent.")
})

// Later...

let newPassword = "mynewpassword12345"

// Token and tokenId are query parameters in the reset password
// link sent in the reset password email.
let token = "someToken"
let tokenId = "someTokenId"
client.resetPassword(to: newPassword, token: token, tokenId: tokenId) { (error) in
    guard error == nil else {
        print("Failed to reset password: \(error!.localizedDescription)")
        return
    }
    // Password reset successful.
    print("Password reset successful.")
}