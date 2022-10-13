  // Find tasks where any project that references the task has a quota greater than 0
  "ANY @links.Project.tasks.quota > 0"
  // Find tasks where all projects that reference the task have a quota greater than 0
  "ALL @links.Project.tasks.quota > 0"
