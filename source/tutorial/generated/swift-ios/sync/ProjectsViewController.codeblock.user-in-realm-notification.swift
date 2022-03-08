self.userRealm = try! Realm(configuration: userRealmConfiguration)
super.init(nibName: nil, bundle: nil)
// There should only be one user in my realm - that is myself
let usersInRealm = userRealm.objects(User.self)
notificationToken = usersInRealm.observe { [weak self, usersInRealm] (_) in
    self?.userData = usersInRealm.first
    guard let tableView = self?.tableView else { return }
    tableView.reloadData()
}
