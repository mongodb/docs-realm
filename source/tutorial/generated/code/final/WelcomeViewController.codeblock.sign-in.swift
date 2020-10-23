@objc func signIn() {
    print("Log in as user: \(email!)");
    setLoading(true);

    app.login(credentials: Credentials.emailPassword(email: email!, password: password!)) { [weak self](result) in
        // Completion handlers are not necessarily called on the UI thread.
        // This call to DispatchQueue.main.sync ensures that any changes to the UI,
        // namely disabling the loading indicator and navigating to the next page,
        // are handled on the UI thread:
        DispatchQueue.main.async {
            self!.setLoading(false);
            switch result {
            case .failure(let error):
                // Auth error: user already exists? Try logging in as that user.
                print("Login failed: \(error)");
                self!.errorLabel.text = "Login failed: \(error.localizedDescription)"
                return
            case .success(let user):
                print("Login succeeded!");

                // Load again while we open the realm.
                self!.setLoading(true);
                // Get a configuration to open the synced realm.
                var configuration = user.configuration(partitionValue: "user=\(user.id)")
                // Only allow User objects in this partition.
                configuration.objectTypes = [User.self, Project.self]
                // Open the realm asynchronously so that it downloads the remote copy before
                // opening the local copy.
                Realm.asyncOpen(configuration: configuration) { [weak self](result) in
                    DispatchQueue.main.async {
                        self!.setLoading(false);
                        switch result {
                        case .failure(let error):
                            fatalError("Failed to open realm: \(error)")
                        case .success(let userRealm):
                            // Go to the list of projects in the user object contained in the user realm.
                            self!.navigationController!.pushViewController(ProjectsViewController(userRealm: userRealm), animated: true);
                        }
                    }
                }
            }
        }
    };
}