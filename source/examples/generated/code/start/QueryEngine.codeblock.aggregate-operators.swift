print("Projects with average task priority above 5: \(projects.filter("tasks.@avg.priority > 5").count)");
print("Projects where all tasks are lower priority: \(projects.filter("tasks.@max.priority < 5").count)");
print("Projects where all tasks are high priority: \(projects.filter("tasks.@min.priority > 5").count)");
print("Projects with more than 5 tasks: \(projects.filter("tasks.@count > 5").count)");
print("Long running projects: \(projects.filter("tasks.@sum.progressMinutes > 100").count)");