
// Note: In each of the following examples, you can replace the
// Where() method with First(), FirstOrDefault(),
// Single(), SingleOrDefault(),
// Last(), or LastOrDefault().

// Get all tasks where the Assignee's name starts with "E" or "e"
var tasksStartWitE = tasks.Where(t => t.Assignee.StartsWith("E",
    StringComparison.OrdinalIgnoreCase));

// Get all tasks where the Assignee's name ends wth "is"
// (lower case only)
var endsWith = tasks.Where(t =>
    t.Assignee.EndsWith("is", StringComparison.Ordinal));

// Get all tasks where the Assignee's name contains the
// letters "ami" in any casing
var tasksContains = tasks.Where(t => t.Assignee.Contains("ami",
     StringComparison.OrdinalIgnoreCase));

// Get all tasks that have no assignee
var null_or_empty = tasks.Where(t => string.IsNullOrEmpty(t.Assignee));

