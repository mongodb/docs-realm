const highPriorityTasks = tasks.filtered("priority > 5");
const unassignedTasks = tasks.filtered("assignee == null");
const lowProgressTasks = tasks.filtered("1 <= progressMinutes && progressMinutes < 10");
const aliTasks = tasks.filtered("assignee == 'Ali'");

console.log(
  `Number of high priority tasks: ${highPriorityTasks.length}`,
  `Number of unassigned tasks: ${unassignedTasks.length}`,
  `Number of just-started or short-running tasks: ${lowProgressTasks.length}`,
  `Number of tasks for Ali: ${aliTasks.length}`
);
