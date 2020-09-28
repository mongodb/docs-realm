import { ObjectId } from "bson";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function useTaskMutations(project) {
  return {
    addTask: useAddTask(project),
    updateTask: useUpdateTask(project),
    deleteTask: useDeleteTask(project),
  };
}

const AddTaskMutation = gql`
  mutation AddTask($task: TaskInsertInput!) {
    addedTask: insertOneTask(data: $task) {
      _id
      _partition
      name
      status
    }
  }
`;

const UpdateTaskMutation = gql`
  mutation UpdateTask($taskId: ObjectId!, $updates: TaskUpdateInput!) {
    updatedTask: updateOneTask(query: { _id: $taskId }, set: $updates) {
      _id
      _partition
      name
      status
    }
  }
`;

const DeleteTaskMutation = gql`
  mutation DeleteTask($taskId: ObjectId!) {
    deletedTask: deleteOneTask(query: { _id: taskId }) {
      _id
      _partition
      name
      status
    }
  }
`;

const TaskFieldsFragment = gql`
  fragment TaskFields on Task {
    _id
    _partition
    status
    name
  }
`;

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
