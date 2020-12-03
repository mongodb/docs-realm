class QueryEngineExamples_Task: Object {
    @objc dynamic var name = ""
    @objc dynamic var isComplete = false
    @objc dynamic var assignee: String? = nil
    @objc dynamic var priority = 0;
    @objc dynamic var progressMinutes = 0;
}

class QueryEngineExamples_Project: Object {
    @objc dynamic var name = ""
    let tasks = List<QueryEngineExamples_Task>();
}