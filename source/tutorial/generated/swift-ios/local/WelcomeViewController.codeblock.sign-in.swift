@objc func signIn() {
    // Go to the list of projects in the user object contained in the user realm.
    var config = Realm.Configuration.defaultConfiguration
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent("project=\(self.username!)")
    config.fileURL!.appendPathExtension("realm")
    config.objectTypes = [Task.self]
    Realm.asyncOpen(configuration: config) { [weak self] (result) in
        switch result {
        case .failure(let error):
            fatalError("Failed to open realm: \(error)")
        case .success(let realm):
            self?.navigationController?.pushViewController(
                TasksViewController(realm: realm, title: "\(self!.username!)'s Tasks"),
                animated: true
            )
        }
    }
}
