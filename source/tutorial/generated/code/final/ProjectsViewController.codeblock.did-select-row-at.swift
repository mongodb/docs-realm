func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let user = app.currentUser!
    let project = userData?.memberOf[indexPath.row] ?? Project(partition: "project=\(user.id)", name: "My Project")

    Realm.asyncOpen(configuration: user.configuration(partitionValue: project.partition!)) { [weak self] (result) in
        switch result {
        case .failure(let error):
            fatalError("Failed to open realm: \(error)")
        case .success(let realm):
            self?.navigationController?.pushViewController(
                TasksViewController(realm: realm, title: "\(project.name!)'s Tasks"),
                animated: true
            );
        }
    }
}