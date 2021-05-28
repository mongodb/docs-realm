@objc func signIn() {
    // Go to the list of projects in the user object contained in the user realm.
    self.navigationController!.pushViewController(ProjectsViewController(username: (self.username)!), animated: true)
}
