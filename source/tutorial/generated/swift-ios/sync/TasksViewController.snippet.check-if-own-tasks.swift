if isOwnTasks() {
    // Only set up the manage team button if these are tasks the user owns.
    toolbarItems = [
        UIBarButtonItem(title: "Manage Team", style: .plain, target: self, action: #selector(manageTeamButtonDidClick))
    ]
    navigationController?.isToolbarHidden = false
}
