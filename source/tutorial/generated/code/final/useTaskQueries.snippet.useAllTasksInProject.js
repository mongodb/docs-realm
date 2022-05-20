export function useAllTasksInProject(project) {
  const {
    data,
    loading,
    error,
    startPolling,
    stopPolling
  } = useQuery(GetAllTasksQuery, {
      variables: {
        partition: project.partition
      },
    }
  );
  React.useEffect(() => {
    // check server for updates every 1000ms
    startPolling(1000);
    // stop polling server for data when component unmounts
    return () => stopPolling();
  }, [startPolling, stopPolling]);
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
