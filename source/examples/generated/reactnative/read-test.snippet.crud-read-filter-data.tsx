const TaskList = () => {
    // retrieve the set of Task objects
    const tasks = useQuery("Task");

    // filter for tasks with a high priority
    const highPriorityTasks = tasks.filtered("priority >= 4");

    // filter for tasks that have just-started or short-running progress
    const lowProgressTasks = tasks.filtered(
    "1 <= progressMinutes && progressMinutes < 10"
    );
    return (
    <>
        <Text>Your high priority tasks:</Text>
        {
            highPriorityTasks.map((taskItem, i) => {
                return(<Text key={taskItem._id + 'element' + i}>{taskItem.name}</Text>)
            })
        }
        <Text>Your tasks without much progress:</Text>
        {
            lowProgressTasks.map((taskItem, i) => {
                return(<Text key={taskItem._id + 'element' + i}>{taskItem.name}</Text>)
            })
        }
    </>)
}
