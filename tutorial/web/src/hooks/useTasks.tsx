import * as React from "react";
import { Task, User } from "../types";

import { GetAllTasksQuery, AddTaskMutationVariables } from "./../types";
import {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./../graphql-operations";

export enum TaskStatus {
  Complete = 'COMPLETE',
  Open = 'OPEN',
  Inprogress = 'INPROGRESS'
}

interface UpdatedTask {
  status?: TaskStatus;
  name?: string;
  assignee?: User;
}

export interface TaskActions {
  addTask: (task: Task) => Promise<void>;
  updateTask: (taskId: string, updated: UpdatedTask) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
}

export function useTasks(): {
  tasks: Array<Task>;
  loading: boolean;
  actions: TaskActions;
} {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  // Query for Tasks
  const { loading } = useGetAllTasksQuery({
    onCompleted: (data: GetAllTasksQuery) => {
      if (data?.tasks) {
        setTasks(data.tasks as Task[]);
      }
    },
  });

  // Create Task Mutation Functions
  const [addTaskMutation] = useAddTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const addTask = async (task: Task) => {
    const variables: AddTaskMutationVariables = {
      task: {
        status: task.status,
        name: task.name,
        _partition: "My Project",
      },
    };
    if(task.assignee) {
      variables.task.assignee = { link: task.assignee._id }
    }
    const currentTasks = [...tasks];
    try {
      const result = await addTaskMutation({ variables });
      const task = result.data?.task as Task;
      setTasks([...tasks, task]);
    } catch (err) {
      setTasks(currentTasks);
      throw new Error(`Unable to add task: ${err}`);
    }
  };

  const updateTask = async (taskId: string, updated: UpdatedTask) => {
    const variables = {
      taskId: taskId,
      updates: {
        status: updated?.status ?? undefined,
        name: updated?.name ?? undefined,
        assignee: updated.assignee
          ? { link: updated.assignee._id }
          : undefined,
      },
    };
    const isSpecifiedTask = (t: Task) => t._id === taskId;
    const currentTasks = [...tasks];
    const currentTask = currentTasks.find(isSpecifiedTask);
    if (!currentTask) {
      return;
    }
    try {
      const result = await updateTaskMutation({ variables });
      const updatedTask: Task = result.data?.task as Task;
      setTasks([...tasks.filter((t) => !isSpecifiedTask(t)), updatedTask]);
    } catch (err) {
      setTasks(currentTasks);
      throw new Error("Unable to update task");
    }
  };

  const deleteTask = async (task: Task) => {
    const variables = { taskId: task._id };
    const currentTasks = [...tasks];
    try {
      await deleteTaskMutation({ variables });
      setTasks([...tasks.filter((t) => t._id !== task._id)]);
    } catch (err) {
      setTasks(currentTasks);
      throw new Error("Unable to delete task");
    }
  };

  return {
    tasks,
    loading,
    actions: {
      addTask,
      updateTask,
      deleteTask,
    },
  };
}
