class Task: Object {
    @objc dynamic var name = ""
    @objc dynamic var isComplete = false
    @objc dynamic var assignee: String?
    @objc dynamic var priority = 0
    @objc dynamic var progressMinutes = 0
}

class Project: Object {
    @objc dynamic var name = ""
    let tasks = List<Task>()
}
