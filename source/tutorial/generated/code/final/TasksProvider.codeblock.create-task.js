const createTask = (newTaskName) => {
  const projectRealm = realmRef.current;
  projectRealm.write(() => {
    // Create a new task in the same partition -- that is, in the same project.
    projectRealm.create(
      "Task",
      new Task({
        name: newTaskName || "New Task",
        partition: projectPartition,
      })
    );
  });
};