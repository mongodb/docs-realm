// :replace-start: {
//   "terms": {
//     "QueryEngineExamples_": ""
//   }
// }
import XCTest
import RealmSwift

// :code-block-start: models
class QueryEngineExamples_Task: Object {
    @Persisted var name = ""
    @Persisted var isComplete = false
    @Persisted var assignee: String?
    @Persisted var priority = 0
    @Persisted var progressMinutes = 0
}

class QueryEngineExamples_Project: Object {
    @Persisted var name = ""
    @Persisted var tasks: List<QueryEngineExamples_Task>
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
            task.priority = 5
            project.tasks.append(task)
            realm.add(project)
            // ...
        }
        let tasks = realm.objects(QueryEngineExamples_Task.self)
        let projects = realm.objects(QueryEngineExamples_Project.self)
        // :code-block-end:

        // :code-block-start: comparison-operators
        let highPriorityTasks = tasks.filter("priority > 5")
        print("High priority tasks: \(highPriorityTasks.count)")

        let longRunningTasks = tasks.filter("progressMinutes > 120")
        print("Long running tasks: \(longRunningTasks.count)")

        let unassignedTasks = tasks.filter("assignee == nil")
        print("Unassigned tasks: \(unassignedTasks.count)")

        let aliOrJamiesTasks = tasks.filter("assignee IN {'Ali', 'Jamie'}")
        print("Ali or Jamie's tasks: \(aliOrJamiesTasks.count)")

        let progressBetween30and60 = tasks.filter("progressMinutes BETWEEN {30, 60}")
        print("Tasks with progress between 30 and 60 minutes: \(progressBetween30and60.count)")
        // :code-block-end:

        // :code-block-start: logical-operators
        let aliComplete = tasks.filter("assignee == 'Ali' AND isComplete == true")
        print("Ali's complete tasks: \(aliComplete.count)")
        // :code-block-end:

        // :code-block-start: string-operators
        // Use [c] for case-insensitivity.
        let startWithE = projects.filter("name BEGINSWITH[c] 'e'")
        print("Projects that start with 'e': \(startWithE.count)")

        let containIe = projects.filter("name CONTAINS 'ie'")
        print("Projects that contain 'ie': \(containIe.count)")

        // [d] for diacritic insensitivty: contains 'e', 'E', 'é', etc.
        let containElike = projects.filter("name CONTAINS[cd] 'e'")
        print("Projects that contain 'e', 'E', 'é', etc.: \(containElike.count)")
        // :code-block-end:

        // :code-block-start: aggregate-operators
        let averageTaskPriorityAbove5 = projects.filter("tasks.@avg.priority > 5")
        print("Projects with average task priority above 5: \(averageTaskPriorityAbove5.count)")

        let allTasksLowerPriority = projects.filter("tasks.@max.priority < 5")
        print("Projects where all tasks are lower priority: \(allTasksLowerPriority.count)")

        let allTasksHighPriority = projects.filter("tasks.@min.priority > 5")
        print("Projects where all tasks are high priority: \(allTasksHighPriority.count)")

        let moreThan5Tasks = projects.filter("tasks.@count > 5")
        print("Projects with more than 5 tasks: \(moreThan5Tasks.count)")

        let longRunningProjects = projects.filter("tasks.@sum.progressMinutes > 100")
        print("Long running projects: \(longRunningProjects.count)")
        // :code-block-end:

        // :code-block-start: set-operators
        let noCompleteTasks = projects.filter("NONE tasks.isComplete == true")
        print("Projects with no complete tasks: \(noCompleteTasks.count)")

        let anyTopPriorityTasks = projects.filter("ANY tasks.priority == 10")
        print("Projects with any top priority tasks: \(anyTopPriorityTasks.count)")
        // :code-block-end:

        // :code-block-start: subquery
        let predicate = NSPredicate(
            format: "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == %@).@count > 0", "Alex")
        print("Projects with incomplete tasks assigned to Alex: \(projects.filter(predicate).count)")
        // :code-block-end:
    }
}

// :replace-end:
