const tasks = realm.objects("Task");
const longRunningTasks = tasks.filtered(
  'status == "completed" && progressMinutes > 120'
);
const completedTasks = tasks.filtered('status == "completed"');
