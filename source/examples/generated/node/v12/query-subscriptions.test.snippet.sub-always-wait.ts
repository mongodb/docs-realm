// Get tasks that have a status of "in progress".
const inProgressTasks = realm
  .objects("Task")
  .filtered("status == 'in progress'");

// Add a sync subscription. Always waits for sync to finish,
// no matter how many times the subscription is added.
await inProgressTasks.subscribe({
  behavior: WaitForSync.Always,
  name: "Always wait for sync",
});
