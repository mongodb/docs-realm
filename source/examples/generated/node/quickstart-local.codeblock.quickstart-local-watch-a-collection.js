// Define the collection notification listener
function listener(tasks, changes) {
  // Update UI in response to deleted objects
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
  });
  // Update UI in response to inserted objects
  changes.insertions.forEach((index) => {
    let insertedTasks = tasks[index];
    // ...
  });
  // Update UI in response to modified objects
  // `oldModifications` contains object indexes from before they were modified
  changes.oldModifications.forEach((index) => {
    let modifiedTask = tasks[index];
    // ...
  });
  // Update UI in response to modified objects
  // `newModifications` contains object indexes from after they were modified
  changes.newModifications.forEach((index) => {
    let modifiedTask = tasks[index];
    // ...
  });
}
// Observe collection notifications.
tasks.addListener(listener);
