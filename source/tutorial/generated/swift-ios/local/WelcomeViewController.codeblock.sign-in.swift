@objc func signIn() {
    DispatchQueue.main.async {
        // Load again while we open the realm.
        self.setLoading(true)
        // Open the realm based on the username entered by the user
        var config = Realm.Configuration.defaultConfiguration
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent(self.email!)
        config.fileURL!.appendPathExtension("realm")
        // Only allow User objects in this partition.
        config.objectTypes = [User.self, Project.self]
        // Open the realm asynchronously so that it downloads the remote copy before
        // opening the local copy.
        Realm.asyncOpen(configuration: config) { [weak self](result) in
            DispatchQueue.main.async {
                self!.setLoading(false)
                switch result {
                case .failure(let error):
                    fatalError("Failed to open realm: \(error)")
                case .success(let userRealm):
                    // Go to the list of projects in the user object contained in the user realm.
                    self!.navigationController!.pushViewController(ProjectsViewController(userRealm: userRealm, username: (self?.email)!), animated: true)
                }
            }
        }
    }
}
