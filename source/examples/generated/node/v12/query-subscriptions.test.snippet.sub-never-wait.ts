// Get tasks that have a status of "in progress".
const inProgressTasks = realm
  .objects("Task")
  .filtered("status == 'in progress'");

// Add a sync subscription. Will not wait for sync to finish.
await inProgressTasks.subscribe({
  behavior: WaitForSync.Never,
  name: "Never wait for sync",
});
