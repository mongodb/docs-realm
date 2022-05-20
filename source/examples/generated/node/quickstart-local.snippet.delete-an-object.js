realm.write(() => {
  // Delete the task from the realm.
  realm.delete(task1);
  // Discard the reference.
  task1 = null;
});
