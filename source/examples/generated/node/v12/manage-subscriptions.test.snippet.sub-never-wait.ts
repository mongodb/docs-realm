// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects(Task)
  .filtered("status == 'completed'");

// Add a sync subscription. Will not wait for sync to finish.
await completedTasks.subscribe({
  behavior: WaitForSync.Never,
  name: "Never wait for sync",
});
