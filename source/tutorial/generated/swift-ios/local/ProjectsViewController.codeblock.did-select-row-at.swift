func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    var config = Realm.Configuration.defaultConfiguration
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent("project=\(self.username)")
    config.fileURL!.appendPathExtension("realm")
    config.objectTypes = [Task.self]
    Realm.asyncOpen(configuration: config) { [weak self] (result) in
        switch result {
        case .failure(let error):
            fatalError("Failed to open realm: \(error)")
        case .success(let realm):
            self?.navigationController?.pushViewController(
                TasksViewController(realm: realm, title: "\(self!.username)'s Tasks"),
                animated: true
            )
        }
    }
}
