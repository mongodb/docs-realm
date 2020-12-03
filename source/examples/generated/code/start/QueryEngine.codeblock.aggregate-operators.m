NSLog(@"Projects with average tasks priority above 5: %lu",
  [[projects objectsWhere:@"tasks.@avg.priority > 5"] count]);

NSLog(@"Long running projects: %lu",
  [[projects objectsWhere:@"tasks.@sum.progressMinutes > 100"] count]);