Debug.WriteLine("Projects with average tasks priority above 5: "
    + projects.Where(p => p.Tasks.Average(task => task.Priority) > 5));\

Debug.WriteLine("Long running projects: "
    + projects.Where(p => p.Tasks.Sum(t => t.ProgressMinutes) > 120));
