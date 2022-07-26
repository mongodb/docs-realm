  // Returns projects with tasks that have not been completed
  // by a user named Alex.
  "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == 'Alex').@count > 0"

  // Returns the projects where the number of completed tasks is
  // greater than or equal to the value of a project's `quota` property.
  "SUBQUERY(tasks, $task, $task.isComplete == true).@count >= quota"
