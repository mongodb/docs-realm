// Returns true if these are the user's own tasks.
func isOwnTasks() -> Bool {
    return partitionValue == "project=\(app.currentUser!.id)"
}