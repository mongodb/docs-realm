// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects(Task)
  .filtered("status == 'completed'");

// Add subscription with timeout
// If timeout is not long enough, will not wait for sync.
const taskSubscription = await completedTasks.subscribe({
  behavior: WaitForSync.Always,
  timeout: 500,
});
