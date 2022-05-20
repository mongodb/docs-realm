@objc func signIn() {
    // Go to the list of tasks in the user object contained in the user realm.
    var config = Realm.Configuration.defaultConfiguration
    // This configuration step is not really needed, but if we add Sync later,
    // this allows us to keep the tasks we made.
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent("project=\(self.username!)")
    config.fileURL!.appendPathExtension("realm")
    navigationController!.pushViewController(
        TasksViewController(realmConfiguration: config, title: "\(username!)'s Tasks"),
        animated: true
    )
}
