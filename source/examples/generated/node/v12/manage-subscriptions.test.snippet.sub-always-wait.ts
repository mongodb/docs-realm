// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects("Task")
  .filtered("status == 'completed'");

// Add a sync subscription. Always waits for sync to finish,
// no matter how many times the subscription is added.
await completedTasks.subscribe({
  behavior: WaitForSync.Always,
  name: "Always wait for sync",
});
