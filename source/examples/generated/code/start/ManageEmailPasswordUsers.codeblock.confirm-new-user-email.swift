let app = App(id: YOUR_REALM_APP_ID)
let client = app.emailPasswordAuth

// Token and tokenId are query parameters in the confirmation
// link sent in the confirmation email.
let token = "someToken"
let tokenId = "someTokenId"
client.confirmUser(token, tokenId: tokenId) { (error) in
    guard error == nil else {
        print("User confirmation failed: \(error!.localizedDescription)")
        return
    }
    // User email address confirmed.
    print("Successfully confirmed user.")
}