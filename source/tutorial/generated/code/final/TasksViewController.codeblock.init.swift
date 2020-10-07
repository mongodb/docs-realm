required init(realm: Realm, title: String) {

    // Ensure the realm was opened with sync.
    guard let syncConfiguration = realm.configuration.syncConfiguration else {
        fatalError("Sync configuration not found! Realm not opened with sync?");
    }

    self.realm = realm

    // Partition value must be of string type.
    partitionValue = syncConfiguration.partitionValue!.stringValue!

    // Access all tasks in the realm, sorted by _id so that the ordering is defined.
    tasks = realm.objects(Task.self).sorted(byKeyPath: "_id")

    super.init(nibName: nil, bundle: nil)

    self.title = title

    // Observe the tasks for changes. Hang on to the returned notification token.
    notificationToken = tasks.observe { [weak self] (changes) in
        guard let tableView = self?.tableView else { return }
        switch changes {
        case .initial:
            // Results are now populated and can be accessed without blocking the UI
            tableView.reloadData()
        case .update(_, let deletions, let insertions, let modifications):
            // Query results have changed, so apply them to the UITableView.
            tableView.performBatchUpdates({
                // It's important to be sure to always update a table in this order:
                // deletions, insertions, then updates. Otherwise, you could be unintentionally
                // updating at the wrong index!
                tableView.deleteRows(at: deletions.map({ IndexPath(row: $0, section: 0) }),
                    with: .automatic)
                tableView.insertRows(at: insertions.map({ IndexPath(row: $0, section: 0) }),
                    with: .automatic)
                tableView.reloadRows(at: modifications.map({ IndexPath(row: $0, section: 0) }),
                    with: .automatic)
            })
        case .error(let error):
            // An error occurred while opening the Realm file on the background worker thread
            fatalError("\(error)")
        }
    }
}