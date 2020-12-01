NSLog(@"High priority tasks: %lu",
  [[tasks objectsWhere:@"priority > 5"] count]);

NSLog(@"Short running tasks: %lu",
  [[tasks objectsWhere:@"progressMinutes between {1, 15}"] count]);

NSLog(@"Unassigned tasks: %lu",
  [[tasks objectsWhere:@"assignee == nil"] count]);

NSLog(@"Ali or Jamie's tasks: %lu",
  [[tasks objectsWhere:@"assignee IN {'Ali', 'Jamie'}"] count]);