import * as Types from './types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';


export const GetAllTasksDocument = gql`
    query GetAllTasks {
  tasks {
    _id
    name
    status
    assignee {
      _id
      name
      image
    }
  }
}
    `;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetAllTasksQuery, Types.GetAllTasksQueryVariables>) {
        return ApolloReactHooks.useQuery<Types.GetAllTasksQuery, Types.GetAllTasksQueryVariables>(GetAllTasksDocument, baseOptions);
      }
export function useGetAllTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetAllTasksQuery, Types.GetAllTasksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Types.GetAllTasksQuery, Types.GetAllTasksQueryVariables>(GetAllTasksDocument, baseOptions);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksQueryResult = ApolloReactCommon.QueryResult<Types.GetAllTasksQuery, Types.GetAllTasksQueryVariables>;
export const AddTaskDocument = gql`
    mutation AddTask($task: TaskInsertInput!) {
  task: insertOneTask(data: $task) {
    _id
    name
    status
    assignee {
      _id
      name
      image
    }
  }
}
    `;
export type AddTaskMutationFn = ApolloReactCommon.MutationFunction<Types.AddTaskMutation, Types.AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.AddTaskMutation, Types.AddTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<Types.AddTaskMutation, Types.AddTaskMutationVariables>(AddTaskDocument, baseOptions);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = ApolloReactCommon.MutationResult<Types.AddTaskMutation>;
export type AddTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<Types.AddTaskMutation, Types.AddTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($taskId: ObjectId!, $updates: TaskUpdateInput!) {
  task: updateOneTask(query: {_id: $taskId}, set: $updates) {
    _id
    name
    status
    assignee {
      _id
      name
      image
    }
  }
}
    `;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<Types.UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: ObjectId!) {
  deletedTask: deleteOneTask(query: {_id: $taskId}) {
    _id
    name
    status
    assignee {
      _id
      name
      image
    }
  }
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<Types.DeleteTaskMutation, Types.DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Types.DeleteTaskMutation, Types.DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<Types.DeleteTaskMutation, Types.DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<Types.DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<Types.DeleteTaskMutation, Types.DeleteTaskMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  user(query: {_id: $userId}) {
    _id
    name
    image
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<Types.GetUserQuery, Types.GetUserQueryVariables>;