print("Projects with no complete tasks: \(projects.filter("NONE tasks.isComplete == true").count)");
print("Projects with any top priority tasks: \(projects.filter("ANY tasks.priority == 10").count)");
