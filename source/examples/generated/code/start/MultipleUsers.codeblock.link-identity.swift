let app = App(id: YOUR_REALM_APP_ID)

func logInAnonymously() {
    app.login(credentials: Credentials.anonymous) { (user, error) in
        guard error == nil else {
            print("Failed to log in: \(error!.localizedDescription)")
            return
        }

        // User uses app, then later registers an account
        registerNewAccount(anonymousUser: user!)
    }
}

func registerNewAccount(anonymousUser: User) {
    let email = "link@example.com"
    let password = "ganondorf"
    app.emailPasswordAuth.registerUser(email: email, password: password) { (error) in
        guard error == nil else {
            print("Failed to register new account: \(error!.localizedDescription)")
            return
        }

        // Successfully created account, now link it
        // with the existing anon user
        link(user: anonymousUser, with: Credentials.emailPassword(email: email, password: password))
    }
}

func link(user: User, with credentials: Credentials) {
    user.linkUser(credentials: credentials) { (user, error) in
        guard error == nil else {
            print("Failed to link user: \(error!.localizedDescription)")
            return
        }

        print("Successfully linked user: \(user!)")

    }
}

logInAnonymously()