// Define the collection notification listener
function listener(tasks, changes) {
  // Update UI in response to deleted objects
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
    console.log(`A task was deleted at the ${index} index`);
  });
  // Update UI in response to inserted objects
  changes.insertions.forEach((index) => {
    let insertedTasks = tasks[index];
    console.log(
      `insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`
    );
    // ...
  });
  // Update UI in response to modified objects
  // `newModifications` contains object indexes from after they were modified
  changes.newModifications.forEach((index) => {
    let modifiedTask = tasks[index];
    console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
    // ...
  });
}
// Observe collection notifications.
tasks.addListener(listener);
