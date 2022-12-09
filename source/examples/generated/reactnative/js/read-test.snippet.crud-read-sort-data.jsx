const TaskList = () => {
  // retrieve the set of Task objects
  const tasks = useQuery('Task');
  // Sort tasks by name in ascending order
  const tasksByName = tasks.sorted('name');
  // Sort tasks by name in descending order
  const tasksByNameDescending = tasks.sorted('name', true);
  // Sort tasks by priority in descending order and then by name alphabetically
  const tasksByPriorityDescendingAndName = tasks.sorted([
    ['priority', true],
    ['name', false],
  ]);
  // Sort Tasks by Assignee's name.
  const tasksByAssigneeName = tasks.sorted('assignee.name');

  return (
    <>
      <Text>All tasks:</Text>
      {tasks.map(task => (
        <Text testID="all-tasks-item" key={'all-tasks-' + task._id}>
          {task.name}
        </Text>
      ))}

      <Text>Tasks sorted by name:</Text>
      {tasksByName.map(task => (
        <Text testID="tasks-by-name-item" key={'tasks-by-name-' + task._id}>
          {task.name}
        </Text>
      ))}

      <Text>Tasks sorted by name descending:</Text>
      {tasksByNameDescending.map(task => (
        <Text
          testID="tasks-by-name-descending-item"
          key={'tasks-by-name-desc-' + task._id}>
          {task.name}
        </Text>
      ))}

      <Text>
        Tasks sorted by priority descending, and name alphabetically:
      </Text>
      {tasksByPriorityDescendingAndName.map(task => (
        <Text
          testID="tasks-by-priority-descending-and-name-item"
          key={'tasks-by-priority-descending-and-name-' + task._id}>
          {task.name}
        </Text>
      ))}

      <Text>Tasks sorted by assignee name:</Text>
      {tasksByAssigneeName.map(task => (
        <Text
          testID="tasks-by-assignee-name-item"
          key={'tasks-by-assignee-name-' + task._id}>
          {task.name}
        </Text>
      ))}
    </>
  );
};
