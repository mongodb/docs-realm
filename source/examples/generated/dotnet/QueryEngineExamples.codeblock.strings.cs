
// Get all tasks where the Assignee's name starts with "E" or "e"
var tasksStartWitE = tasks.Where(t => t.Assignee.StartsWith("E",
    StringComparison.OrdinalIgnoreCase));

// Get all tasks where the Assignee's name contains "is"
// (lower case only)
var tasksContains = tasks.Where(t => t.Assignee.Contains("is",
     StringComparison.Ordinal));

