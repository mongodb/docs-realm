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