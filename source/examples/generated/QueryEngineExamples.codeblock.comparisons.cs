var highPri = tasks.Where(t => t.Priority > 5);

var quickTasks = tasks.Where(t => 1 <= t.ProgressMinutes && t.ProgressMinutes < 15);

var unassignedTasks = tasks.Where(t => t.Assignee == null);

var AliOrJamieTasks = tasks.Where(t => new List<string> { "Ali", "Jamie" }.Contains(t.Assignee));
