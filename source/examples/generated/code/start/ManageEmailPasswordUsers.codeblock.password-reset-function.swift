let app = App(id: YOUR_REALM_APP_ID)
let client = app.emailPasswordAuth

let email = "forgot.my.password@example.com"
let newPassword = "mynewpassword12345"
let args: [AnyBSON] = []

client.callResetPasswordFunction(email: email, password: newPassword, args: args) { (error) in
    guard error == nil else {
        print("Password reset failed: \(error!.localizedDescription)")
        return
    }
    print("Password reset successful!")
}
