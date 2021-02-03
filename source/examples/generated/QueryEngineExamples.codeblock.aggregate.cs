var highPriProjects = projects.Where(p => p.Tasks.Average(task =>
    task.Priority) > 5);

var longRunningProjects = projects.Where(p => p.Tasks.Sum(t =>
    t.ProgressMinutes) > 120);
