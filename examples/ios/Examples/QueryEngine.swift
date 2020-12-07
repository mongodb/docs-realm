import XCTest
import RealmSwift

// :code-block-start: models
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
// :code-block-end:

class QueryEngine: XCTestCase {
    override func tearDown() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    func testPredicates() {
        // :code-block-start: predicates
        let predicate = NSPredicate(format: "progressMinutes > 1 AND name == %@", "Ali")
        // :code-block-end:
        
        // :code-block-start: substitutions
        NSPredicate(format: "%K > %@ AND %K == %@", "progressMinutes", NSNumber(1), "name", "Ali")
        // :code-block-end:
    }

    func testFilters() {
        // :code-block-start: setup
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
        // :code-block-end:
        
        // :code-block-start: comparison-operators
        print("High priority tasks: \(tasks.filter("priority > 5").count)");
        print("Long running tasks: \(tasks.filter("progressMinutes > 120").count)");
        print("Unassigned tasks: \(tasks.filter("assignee == nil").count)");
        print("Ali or Jamie's tasks: \(tasks.filter("assignee IN {'Ali', 'Jamie'}").count)");
        print("Tasks with progress between 30 and 60 minutes: \(tasks.filter("progressMinutes BETWEEN {30, 60}").count)");
        // :code-block-end:
        
        // :code-block-start: logical-operators
        print("Ali's complete tasks: \(tasks.filter("assignee == 'Ali' AND isComplete == true").count)");
        // :code-block-end:
        
        // :code-block-start: string-operators
        // Use [c] for case-insensitivity.
        print("Projects that start with 'e': \(projects.filter("name BEGINSWITH[c] 'e'").count)");
        print("Projects that contain 'ie': \(projects.filter("name CONTAINS 'ie'").count)");
        print("Projects that contain 'e', 'E', 'é', etc.: \(projects.filter("name CONTAINS[cd] 'e'").count)");
        // :code-block-end:

        // :code-block-start: aggregate-operators
        print("Projects with average tasks priority above 5: \(projects.filter("tasks.@avg.priority > 5").count)");
        print("Long running projects: \(projects.filter("tasks.@sum.progressMinutes > 100").count)");
        // :code-block-end:
        
        // :code-block-start: set-operators
        print("Projects with no complete tasks: \(projects.filter("NONE tasks.isComplete == true").count)");
        print("Projects with any top priority tasks: \(projects.filter("ANY tasks.priority == 10").count)");
        // :code-block-end:
        
        print("chbus projects: \(projects)")
        
        // :code-block-start: subquery
        let predicate = NSPredicate(
            format: "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == %@).@count > 0", "Alex")
        print("Projects with incomplete tasks assigned to Alex: \(projects.filter(predicate).count)")
        // :code-block-end:
    }
}
