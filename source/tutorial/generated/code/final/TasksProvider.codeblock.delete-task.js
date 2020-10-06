// Define the function for deleting a task.
const deleteTask = (task) => {
  const projectRealm = realmRef.current;
  projectRealm.write(() => {
    projectRealm.delete(task);
    setTasks([...projectRealm.objects("Task").sorted("name")]);
  });
};