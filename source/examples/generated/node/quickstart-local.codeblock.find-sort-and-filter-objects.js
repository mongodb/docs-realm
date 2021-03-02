// query realm for all instances of the "Task" type.
const tasks = realm.objects("Task");
console.log(`The lists of tasks are: ${tasks.map((task) => task.name)}`);

// filter for all tasks with a status of "Open"
const openTasks = tasks.filtered("status = 'Open'");
console.log(
  `The lists of open tasks are: ${openTasks.map(
    (openTask) => openTask.name
  )}`
);

// Sort tasks by name in ascending order
const tasksByName = tasks.sorted("name");
console.log(
  `The lists of tasks in alphabetical order are: ${tasksByName.map(
    (taskByName) => taskByName.name
  )}`
);
