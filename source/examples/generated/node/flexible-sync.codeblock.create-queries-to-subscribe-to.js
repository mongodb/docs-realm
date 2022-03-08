const tasks = realm.objects("Task");
const longRunningTasks = tasks.filtered(
  'status == "completed" && progressMinutes > 120'
);
const bensTasks = tasks.filtered('owner == "Ben"');
