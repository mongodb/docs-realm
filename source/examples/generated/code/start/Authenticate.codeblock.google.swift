func sign(_ signIn: GIDSignIn!, didSignInFor googleUser: GIDGoogleUser!, withError error: Error!) {
    if let error = error {
        if (error as NSError).code == GIDSignInErrorCode.hasNoAuthInKeychain.rawValue {
            print("The user has not signed in before or they have since signed out.")
        } else {
            print("\(error.localizedDescription)")
        }
        return
    }
    // Signed in successfully, forward credentials to MongoDB Realm.
    let credentials = Credentials.google(serverAuthCode: googleUser.serverAuthCode)
    app.login(credentials: credentials) { result in
        DispatchQueue.main.async {
            switch result {
            case .failure(let error):
                print("Failed to log in to MongoDB Realm: \(error)")
            case .success(let user):
                print("Successfully logged in to MongoDB Realm using Google OAuth.")
                // Now logged in, do something with user
                // Remember to dispatch to main if you are doing anything on the UI thread
            }
        }
    }
}