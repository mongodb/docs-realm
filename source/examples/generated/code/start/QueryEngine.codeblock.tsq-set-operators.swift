let noCompleteTasks = projects.where {
    $0.tasks.isComplete != true
}
print("Projects with no complete tasks: \(noCompleteTasks.count)")

let anyTopPriorityTasks = projects.where {
    $0.tasks.priority == 10
}
print("Projects with any top priority tasks: \(anyTopPriorityTasks.count)")
