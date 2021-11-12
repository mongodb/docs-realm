const GetAllTasksQuery = gql`
  query GetAllTasksForProject($partition: String!) {
    tasks(query: { _partition: $partition }) {
      _id
      name
      status
    }
  }
`;
