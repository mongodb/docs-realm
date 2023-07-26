// Get tasks that have a status of "in progress".
const inProgressTasks = realm
  .objects("Task")
  .filtered("status == 'in progress'");

// Add a sync subscription. Only waits for sync to finish
// the first time the subscription is added.
await inProgressTasks.subscribe({
  behavior: WaitForSync.FirstTime,
  name: "First time sync only",
});

// Unsubscribe
inProgressTasks.unsubscribe();
