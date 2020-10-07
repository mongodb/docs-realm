function useUpdateTask(project) {
  const [updateTaskMutation] = useMutation(UpdateTaskMutation);
  const updateTask = async (task, updates) => {
    const { updatedTask } = await updateTaskMutation({
      variables: { taskId: task._id, updates },
    });
    return updatedTask;
  };
  return updateTask;
}