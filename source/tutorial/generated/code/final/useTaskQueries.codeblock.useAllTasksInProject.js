export function useAllTasksInProject(project) {
  const {
    data,
    loading,
    error
  } = useQuery(GetAllTasksQuery, {
      variables: {
        partition: project.partition
      },
      pollInterval: 500
    }
  );
  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  // If the query has finished, return the tasks from the result data
  // Otherwise, return an empty list
  const tasks = data?.tasks ?? [];
  return {
    tasks,
    loading
  };
}
