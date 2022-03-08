  "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == 'Alex').@count > 0"

  "SUBQUERY(tasks, $task, $task.isComplete == true).@count >= quota"
