IncompleteItems = Employee123.Items
    .AsQueryable()
    .Where(i => i.IsComplete == false);
