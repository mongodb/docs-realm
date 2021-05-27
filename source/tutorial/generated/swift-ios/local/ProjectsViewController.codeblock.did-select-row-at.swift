func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let project = Project(partition: "project=\(self.username)", name: "My Project")
    var config = Realm.Configuration.defaultConfiguration
    config.fileURL!.deleteLastPathComponent()
    config.fileURL!.appendPathComponent(project.partition!)
    config.fileURL!.appendPathExtension("realm")
    config.objectTypes = [Task.self]
    Realm.asyncOpen(configuration: config) { [weak self] (result) in
        switch result {
        case .failure(let error):
            fatalError("Failed to open realm: \(error)")
        case .success(let realm):
            self?.navigationController?.pushViewController(
                TasksViewController(realm: realm, title: "\(project.name!)'s Tasks"),
                animated: true
            )
        }
    }
}
