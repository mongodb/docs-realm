const tasks = realm.objects("Task");
// Gets all tasks where the 'priority' property is 7 or more.
const importantTasks = tasks.filtered("priority >= 7");
