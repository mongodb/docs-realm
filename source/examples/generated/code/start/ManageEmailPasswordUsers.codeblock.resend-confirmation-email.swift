let app = App(id: YOUR_REALM_APP_ID)
let client = app.emailPasswordAuth
let email = "skroob@example.com"
// If Realm is set to send a confirmation email, we can
// send the confirmation email again here.
client.resendConfirmationEmail(email) { (error) in
    guard error == nil else {
        print("Failed to resend confirmation email: \(error!.localizedDescription)")
        return
    }
    // The confirmation email has been sent
    // to the user again.
    print("Confirmation email resent")
}
