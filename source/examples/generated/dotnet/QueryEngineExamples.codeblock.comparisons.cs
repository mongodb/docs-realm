var highPri = tasks.Where(t => t.Priority > 5);

var quickTasks = tasks.Where(t =>
    t.ProgressMinutes >= 1 &&
    t.ProgressMinutes < 15);

var unassignedTasks = tasks.Where(t =>
    t.Assignee == null);

var AliOrJamieTasks = tasks.Where(t =>
    t.Assignee == "Ali" ||
    t.Assignee == "Jamie");
