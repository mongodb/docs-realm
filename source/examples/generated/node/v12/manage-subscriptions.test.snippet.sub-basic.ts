const completedTasks = await realm
  .objects(Task)
  .filtered('status == "completed"')
  .subscribe();
const longRunningTasks = await completedTasks
  .filtered('status == "completed" && progressMinutes > 120')
  .subscribe();
