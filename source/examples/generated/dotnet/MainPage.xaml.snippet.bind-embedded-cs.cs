public Employee Employee123 { get; }
...
IncompleteItems = Employee123.Items
    .AsQueryable()
    .Where(i => i.IsComplete == false);
