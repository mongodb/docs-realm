let realm = try! Realm()
try! realm.write {
    // Add tasks and projects here.
    let project = QueryEngineExamples_Project()
    project.name = "New Project"
    let task = QueryEngineExamples_Task()
    task.assignee = "Alex"
    project.tasks.append(task)
    realm.add(project)
    // ...
}
let tasks = realm.objects(QueryEngineExamples_Task.self)
let projects = realm.objects(QueryEngineExamples_Project.self)