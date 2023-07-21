const TaskList = () => {
  // retrieve the set of Task objects
  const tasks = useQuery(Task);

  // filter for tasks with a high priority
  const highPriorityTasks = tasks.filtered('priority >= $0', 4);

  // filter for tasks that have just-started or short-running progress
  const lowProgressTasks = tasks.filtered(
    '$0 <= progressMinutes && progressMinutes < $1', 1, 10
  );
  return (
    <>
      <Text>Your high priority tasks:</Text>
      {highPriorityTasks.map(taskItem => {
        return <Text>{taskItem.name}</Text>;
      })}
      <Text>Your tasks without much progress:</Text>
      {lowProgressTasks.map(taskItem => {
        return <Text>{taskItem.name}</Text>;
      })}
    </>
  );
};
