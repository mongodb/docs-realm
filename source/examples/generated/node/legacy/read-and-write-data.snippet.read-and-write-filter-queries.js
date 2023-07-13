// retrieve the set of Task objects
const tasks = realm.objects("Task");
// filter for tasks with a high priority
const highPriorityTasks = tasks.filtered("priority > 5");
// filter for tasks that have just-started or short-running progress
const lowProgressTasks = tasks.filtered(
  "1 <= progressMinutes && progressMinutes < 10"
);
console.log(
  `Number of high priority tasks: ${highPriorityTasks.length} \n`,
  `Number of just-started or short-running tasks: ${lowProgressTasks.length}`
);
