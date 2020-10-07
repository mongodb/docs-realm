@objc func signIn() {
    print("Log in as user: \(email!)");
    setLoading(true);

    app.login(credentials: Credentials.emailPassword(email: email!, password: password!)) { [weak self](maybeUser, error) in
        // Completion handlers are not necessarily called on the UI thread.
        // This call to DispatchQueue.main.sync ensures that any changes to the UI,
        // namely disabling the loading indicator and navigating to the next page,
        // are handled on the UI thread:
        DispatchQueue.main.sync {
            self!.setLoading(false);
            guard error == nil else {
                // Auth error: user already exists? Try logging in as that user.
                print("Login failed: \(error!)");
                self!.errorLabel.text = "Login failed: \(error!.localizedDescription)"
                return
            }

            guard let user = maybeUser else {
                fatalError("Invalid user object?")
            }

            print("Login succeeded!");

            self!.setLoading(true);

            // Get a configuration to open the synced realm.
            var configuration = user.configuration(partitionValue: "user=\(user.id)")
            // Only allow User objects in this partition.
            configuration.objectTypes = [User.self, Project.self]
            // Open the realm asynchronously so that it downloads the remote copy before
            // opening the local copy.
            Realm.asyncOpen(configuration: configuration) { [weak self](userRealm, error) in
                self!.setLoading(false);
                guard error == nil else {
                    fatalError("Failed to open realm: \(error!)")
                }

                // For the second phase of the tutorial, go to the Projects management page.
                // This is where you can manage permissions and collaborators.
                self!.navigationController!.pushViewController(ProjectsViewController(userRealm: userRealm!), animated: true);
            }
        }
    };
}