import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

// :code-block-start: GetAllTasksQuery
// :state-start: final
const GetAllTasksQuery = gql `
      query GetAllTasksForProject($partition: String!) {
        tasks(query: { _partition: $partition }) {
          _id
          name
          status
        }
      }
    `;
// :state-end: 
// :state-uncomment-start: start
// // TODO: Add the GraphGL query for fetching all tasks.
// const GetAllTasksQuery = gql``;
// :state-uncomment-end:
// :code-block-end:

// :code-block-start: useAllTasksInProject
export function useAllTasksInProject(project) {
  // :state-start: final
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
  // :state-end: 
  // :state-uncomment-start: start
  // // TODO: Use GetAllTasksQuery to fetch the tasks for the project every 500ms
  // :state-uncomment-end:
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
// :code-block-end:
