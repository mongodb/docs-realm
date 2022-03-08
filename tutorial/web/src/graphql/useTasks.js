import useTaskMutations from "./useTaskMutations";
import { useAllTasksInProject } from "./useTaskQueries";

const useTasks = (project) => {
  const { tasks, loading } = useAllTasksInProject(project);
  const { addTask, updateTask } = useTaskMutations(project);
  return {
    loading,
    tasks,
    updateTask,
    addTask,
  };
};
export default useTasks;
