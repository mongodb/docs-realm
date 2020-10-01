// If the task is not in the Open state, we can set it to open. Otherwise, that action will not be available.
// We do this for the other two states -- InProgress and Complete.
if (task.statusEnum != .Open) {
    actionSheet.addAction(UIAlertAction(title: "Open", style: .default) { _ in
            // Any modifications to managed objects must occur in a write block.
            // When we modify the Task's state, that change is automatically reflected in the realm.
            try! self.realm.write {
                task.statusEnum = .Open
            }
        })
}

if (task.statusEnum != .InProgress) {
    actionSheet.addAction(UIAlertAction(title: "Start Progress", style: .default) { _ in
            try! self.realm.write {
                task.statusEnum = .InProgress
            }
        })
}

if (task.statusEnum != .Complete) {
    actionSheet.addAction(UIAlertAction(title: "Complete", style: .default) { _ in
            try! self.realm.write {
                task.statusEnum = .Complete
            }
        })
}