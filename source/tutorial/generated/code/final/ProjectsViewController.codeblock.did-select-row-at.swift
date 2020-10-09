func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let user = app.currentUser!
    let project = userData?.memberOf[indexPath.row] ?? Project(partition: "project=\(user.id)", name: "My Project")

    Realm.asyncOpen(configuration: user.configuration(partitionValue: project.partition!)) { [weak self] (realm, error) in
        guard error == nil else {
            fatalError("Failed to open realm: \(error!)")
        }

        self?.navigationController?.pushViewController(
            TasksViewController(realm: realm!, title: "\(project.name!)'s Tasks"),
            animated: true
        );
    }
}