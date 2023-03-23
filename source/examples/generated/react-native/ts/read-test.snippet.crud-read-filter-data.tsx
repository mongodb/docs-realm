const TaskList = () => {
  // retrieve the set of Task objects
  const tasks = useQuery(Task);

  // filter for tasks with a high priority
  const highPriorityTasks = tasks.filtered('priority >= 4');

  // filter for tasks that have just-started or short-running progress
  const lowProgressTasks = tasks.filtered(
    '1 <= progressMinutes && progressMinutes < 10',
  );
  console.log('highPriorityTasks', highPriorityTasks.length);

  console.log('lowProgressTasks', lowProgressTasks.length);
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
