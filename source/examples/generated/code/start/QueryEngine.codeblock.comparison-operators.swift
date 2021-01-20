print("High priority tasks: \(tasks.filter("priority > 5").count)");
print("Long running tasks: \(tasks.filter("progressMinutes > 120").count)");
print("Unassigned tasks: \(tasks.filter("assignee == nil").count)");
print("Ali or Jamie's tasks: \(tasks.filter("assignee IN {'Ali', 'Jamie'}").count)");
print("Tasks with progress between 30 and 60 minutes: \(tasks.filter("progressMinutes BETWEEN {30, 60}").count)");