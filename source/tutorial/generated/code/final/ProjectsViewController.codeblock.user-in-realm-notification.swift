// There should only be one user in my realm - that is myself
let usersInRealm = userRealm.objects(User.self)

notificationToken = usersInRealm.observe { [weak self, usersInRealm] (changes) in
    self?.userData = usersInRealm.first
    guard let tableView = self?.tableView else { return }
    tableView.reloadData()
}