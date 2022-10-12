    // Find tasks that belong to a project with a quota greater than 10 (LinkingObjects)
    "projects.quota > 10"
    // Find tasks that belong to a project with a quota greater than 10 (@links)
    "@links.Project.tasks.quota > 10"
    // Find tasks where any project that references the task has a quota greater than 0
    "ANY @links.Project.tasks.quota > 0"
    // Find tasks where all projects that reference the task have a quota greater than 0
    "ALL @links.Project.tasks.quota > 0"
    // Find tasks that are referenced by multiple projects
    "projects.@count > 1"
    // Find tasks that are not referenced by any project
    "@links.Project.tasks.@count == 0"
    // Find tasks that belong to a project where the average task has
    // been worked on for at least 5 minutes
    "@links.Project.tasks.tasks.@avg.progressMinutes > 10"
    // Find tasks that are not referenced by another object of any type
    "@links.@count == 0"
