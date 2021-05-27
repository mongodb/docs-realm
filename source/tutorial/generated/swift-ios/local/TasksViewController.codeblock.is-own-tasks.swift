// Returns true if these are the user's own tasks.
func isOwnTasks() -> Bool {
    return false // no need to manage users when there is no app or users
    // return partitionValue == "project=\(app.currentUser!.id)"
}
