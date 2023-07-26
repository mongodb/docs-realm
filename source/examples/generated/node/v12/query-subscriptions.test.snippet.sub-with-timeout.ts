// Get tasks that have a status of "in progress".
const inProgressTasks = realm
  .objects("Task")
  .filtered("status == 'in progress'");

// Add subscription with timeout
// If timeout is not long enough, will not wait for sync.
const taskSubscription = await inProgressTasks.subscribe({
  behavior: WaitForSync.Always,
  timeout: 500,
});
