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

// :code-block-start: addTaskMutation
// :hide-start: 
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
// :replace-with: 
// // TODO: Add the GraphGL mutation for adding a task.
// const AddTaskMutation = gql``;
// :hide-end:
// :code-block-end: 

// :code-block-start: updateTaskMutation
// :hide-start: 
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
// :replace-with: 
// // TODO: Add the GraphGL mutation for updating a task.
// const UpdateTaskMutation = gql``;
// :hide-end:
// :code-block-end: 

// :code-block-start: deleteTaskMutation
// :hide-start: 
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
// :replace-with: 
// // TODO: Add the GraphGL mutation for deleting a task.
// const DeleteTaskMutation = gql``;
// :hide-end:
// :code-block-end: 

const TaskFieldsFragment = gql`
  fragment TaskFields on Task {
    _id
    _partition
    status
    name
  }
`;

// :code-block-start: useAddTask
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
    // :hide-start:
    const { addedTask } = await addTaskMutation({
      variables: {
        task: {
          _id: new ObjectId(),
          _partition: project.partition,
          status: "Open",
          ...task,
        },
      },
      // :replace-with:
      // // TODO: Use the functions returned from the addTaskMutation hook to execute the
      // // mutation.
      // :hide-end:
    });
    return addedTask;
  };

  return addTask;
}
// :code-block-end: 

// :code-block-start: useUpdateTask
// :hide-start: 
function useUpdateTask(project) {
  const [updateTaskMutation] = useMutation(UpdateTaskMutation);
  // :hide-start:
  const updateTask = async (task, updates) => {
    const { updatedTask } = await updateTaskMutation({
      variables: { taskId: task._id, updates },
    });
    return updatedTask;
  };
  // :replace-with:
  // // TODO: Use the functions returned from the updateTaskMutation to execute the
  // // mutation.
  // :hide-end:
  return updateTask;
}
// :code-block-end: 

// :code-block-start: useDeleteTask
function useDeleteTask(project) {
  const [deleteTaskMutation] = useMutation(DeleteTaskMutation);
  // :hide-start:
  const deleteTask = async (task) => {
    const { deletedTask } = await deleteTaskMutation({
      variables: { taskId: task._id },
    });
    return deletedTask;
  };
  // :replace-with:
  // // TODO: Use the functions returned from the deleteTaskMutation to execute the
  // // mutation.
  // :hide-end:
  return deleteTask;
}
// :code-block-end: 
