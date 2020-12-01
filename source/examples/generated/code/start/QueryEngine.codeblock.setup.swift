let realm = try! Realm()
try! realm.write {
    // Add tasks and projects here.
    let project = QueryEngineExamples_Project()
    project.name = "New Project"
    realm.add(project)
    // ...
}
let tasks = realm.objects(QueryEngineExamples_Task.self)
let projects = realm.objects(QueryEngineExamples_Project.self)