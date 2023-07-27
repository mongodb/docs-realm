// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects(Task)
  .filtered("status == 'completed'");

// Add a sync subscription. Only waits for sync to finish
// the first time the subscription is added.
await completedTasks.subscribe({
  behavior: WaitForSync.FirstTime,
  name: "First time sync only",
});
