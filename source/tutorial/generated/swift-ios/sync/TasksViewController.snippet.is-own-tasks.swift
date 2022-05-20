// Returns true if these are the user's own tasks.
func isOwnTasks() -> Bool {
    let partitionValue = self.realm.configuration.syncConfiguration?.partitionValue?.stringValue
    return partitionValue != nil && partitionValue == "project=\(app.currentUser!.id)"
}
