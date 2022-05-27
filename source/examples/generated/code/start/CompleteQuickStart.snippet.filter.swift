let tasksInProgress = tasks.where {
    $0.status == "InProgress"
}
print("A list of all tasks in progress: \(tasksInProgress)")
