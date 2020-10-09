function useAddTask(project) {
  const [addTaskMutation] = useMutation(AddTaskMutation, {
    // Manually save added Tasks into the Apollo cache so that Task queries automatically update
    // For details, refer to https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: { addedTask } }) => {
      cache.modify({
        fields: {
          tasks: (existingTasks = []) => [
            ...existingTasks,
            cache.writeFragment({
              data: addedTask,
              fragment: TaskFieldsFragment,
            }),
          ],
        },
      });
    },
  });

  const addTask = async (task) => {
    const { addedTask } = await addTaskMutation({
      variables: {
        task: {
          _id: new ObjectId(),
          _partition: project.partition,
          status: "Open",
          ...task,
        },
      },
    });
    return addedTask;
  };

  return addTask;
}