// Log in anonymously.
app.login(credentials: Credentials.anonymous) { (result) in
    // Remember to dispatch back to the main thread in completion handlers
    // if you want to do anything on the UI.
    DispatchQueue.main.async {
        switch result {
        case .failure(let error):
            print("Login failed: \(error)")
        case .success(let user):
            print("Login as \(user) succeeded!")
            // Continue below
            onLogin()
        }
    }
}
