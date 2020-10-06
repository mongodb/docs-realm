function useDeleteTask(project) {
  const [deleteTaskMutation] = useMutation(DeleteTaskMutation);
  const deleteTask = async (task) => {
    const { deletedTask } = await deleteTaskMutation({
      variables: { taskId: task._id },
    });
    return deletedTask;
  };
  return deleteTask;
}