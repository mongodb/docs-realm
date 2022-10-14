  // Find tasks that are referenced by multiple projects
  "projects.@count > 1"
  // Find tasks that are not referenced by any project
  "@links.Project.tasks.@count == 0"
  // Find tasks that belong to a project where the average task has
  // been worked on for at least 5 minutes
  "@links.Project.tasks.tasks.@avg.progressMinutes > 10"
