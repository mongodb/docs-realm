let aliOrJamiesTasks = tasks.where {
    $0.assignee.contains("Ali") || $0.assignee.contains("Jamie")
}
print("Tasks IN Ali or Jamie: \(aliOrJamiesTasks.count)")

let progressBetween30and60 = tasks.where {
    $0.progressMinutes.contains(30...60)
}
print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
