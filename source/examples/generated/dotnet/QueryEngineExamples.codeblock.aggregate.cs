// Get all projects with an average Task priorty > 5:
var avgPriority = projects.Filter(
    "Tasks.@avg.Priority > 5");

// Get all projects where all Tasks are high-priority:
var highPriProjects = projects.Filter(
    "Tasks.@min.Priority > 5");

// Get all projects with long-running Tasks:
var longRunningProjects = projects.Filter(
    "Tasks.@sum.ProgressMinutes > 100");
