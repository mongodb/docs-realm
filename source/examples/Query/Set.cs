Debug.WriteLine("Projects with no complete tasks: "
    + projects.Where(p => !p.Tasks.Any(t => t.IsComplete)));

Debug.WriteLine("Projects with any top priority tasks: "
    + projects.Where(p => p.Tasks.Any(t => t.Priority == 10)));
