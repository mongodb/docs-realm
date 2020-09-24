Debug.WriteLine("High priority tasks: "
        + tasks.Where(t => t.Priority > 5));

Debug.WriteLine("Just started or short tasks: "
    + tasks.Where(t => 1 <= t.ProgressMinutes && t.ProgressMinutes < 15));

Debug.WriteLine("Unassigned tasks: "
    + tasks.Where(t => t.Assignee == null));

Debug.WriteLine("Ali or Jamie's tasks: "
    + tasks.Where(t => new List<string> { "Ali", "Jamie" }.Contains(t.Assignee)));

