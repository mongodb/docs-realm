export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjectId: any;
};

export type DeleteManyPayload = {
  __typename?: 'DeleteManyPayload';
  deletedCount: Scalars['Int'];
};

export type InsertManyPayload = {
  __typename?: 'InsertManyPayload';
  insertedIds: Array<Maybe<Scalars['ObjectId']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteManyProjects?: Maybe<DeleteManyPayload>;
  deleteManyTasks?: Maybe<DeleteManyPayload>;
  deleteManyUsers?: Maybe<DeleteManyPayload>;
  deleteOneProject?: Maybe<Project>;
  deleteOneTask?: Maybe<Task>;
  deleteOneUser?: Maybe<User>;
  insertManyProjects?: Maybe<InsertManyPayload>;
  insertManyTasks?: Maybe<InsertManyPayload>;
  insertManyUsers?: Maybe<InsertManyPayload>;
  insertOneProject?: Maybe<Project>;
  insertOneTask?: Maybe<Task>;
  insertOneUser?: Maybe<User>;
  replaceOneProject?: Maybe<Project>;
  replaceOneTask?: Maybe<Task>;
  replaceOneUser?: Maybe<User>;
  updateManyProjects?: Maybe<UpdateManyPayload>;
  updateManyTasks?: Maybe<UpdateManyPayload>;
  updateManyUsers?: Maybe<UpdateManyPayload>;
  updateOneProject?: Maybe<Project>;
  updateOneTask?: Maybe<Task>;
  updateOneUser?: Maybe<User>;
  upsertOneProject?: Maybe<Project>;
  upsertOneTask?: Maybe<Task>;
  upsertOneUser?: Maybe<User>;
};


export type MutationDeleteManyProjectsArgs = {
  query?: Maybe<ProjectQueryInput>;
};


export type MutationDeleteManyTasksArgs = {
  query?: Maybe<TaskQueryInput>;
};


export type MutationDeleteManyUsersArgs = {
  query?: Maybe<UserQueryInput>;
};


export type MutationDeleteOneProjectArgs = {
  query: ProjectQueryInput;
};


export type MutationDeleteOneTaskArgs = {
  query: TaskQueryInput;
};


export type MutationDeleteOneUserArgs = {
  query: UserQueryInput;
};


export type MutationInsertManyProjectsArgs = {
  data: Array<ProjectInsertInput>;
};


export type MutationInsertManyTasksArgs = {
  data: Array<TaskInsertInput>;
};


export type MutationInsertManyUsersArgs = {
  data: Array<UserInsertInput>;
};


export type MutationInsertOneProjectArgs = {
  data: ProjectInsertInput;
};


export type MutationInsertOneTaskArgs = {
  data: TaskInsertInput;
};


export type MutationInsertOneUserArgs = {
  data: UserInsertInput;
};


export type MutationReplaceOneProjectArgs = {
  query?: Maybe<ProjectQueryInput>;
  data: ProjectInsertInput;
};


export type MutationReplaceOneTaskArgs = {
  query?: Maybe<TaskQueryInput>;
  data: TaskInsertInput;
};


export type MutationReplaceOneUserArgs = {
  query?: Maybe<UserQueryInput>;
  data: UserInsertInput;
};


export type MutationUpdateManyProjectsArgs = {
  query?: Maybe<ProjectQueryInput>;
  set: ProjectUpdateInput;
};


export type MutationUpdateManyTasksArgs = {
  query?: Maybe<TaskQueryInput>;
  set: TaskUpdateInput;
};


export type MutationUpdateManyUsersArgs = {
  query?: Maybe<UserQueryInput>;
  set: UserUpdateInput;
};


export type MutationUpdateOneProjectArgs = {
  query?: Maybe<ProjectQueryInput>;
  set: ProjectUpdateInput;
};


export type MutationUpdateOneTaskArgs = {
  query?: Maybe<TaskQueryInput>;
  set: TaskUpdateInput;
};


export type MutationUpdateOneUserArgs = {
  query?: Maybe<UserQueryInput>;
  set: UserUpdateInput;
};


export type MutationUpsertOneProjectArgs = {
  query?: Maybe<ProjectQueryInput>;
  data: ProjectInsertInput;
};


export type MutationUpsertOneTaskArgs = {
  query?: Maybe<TaskQueryInput>;
  data: TaskInsertInput;
};


export type MutationUpsertOneUserArgs = {
  query?: Maybe<UserQueryInput>;
  data: UserInsertInput;
};


export type Project = {
  __typename?: 'Project';
  _id: Scalars['ObjectId'];
  _partition?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ProjectInsertInput = {
  _id?: Maybe<Scalars['ObjectId']>;
  _partition?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ProjectQueryInput = {
  name_exists?: Maybe<Scalars['Boolean']>;
  name_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_nin?: Maybe<Array<Maybe<Scalars['ObjectId']>>>;
  _id?: Maybe<Scalars['ObjectId']>;
  _partition_ne?: Maybe<Scalars['String']>;
  _id_gte?: Maybe<Scalars['ObjectId']>;
  AND?: Maybe<Array<ProjectQueryInput>>;
  _id_gt?: Maybe<Scalars['ObjectId']>;
  _partition_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_in?: Maybe<Array<Maybe<Scalars['ObjectId']>>>;
  OR?: Maybe<Array<ProjectQueryInput>>;
  name_ne?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  _partition?: Maybe<Scalars['String']>;
  _partition_gt?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _partition_lt?: Maybe<Scalars['String']>;
  _partition_gte?: Maybe<Scalars['String']>;
  _id_lte?: Maybe<Scalars['ObjectId']>;
  _id_exists?: Maybe<Scalars['Boolean']>;
  name_gte?: Maybe<Scalars['String']>;
  _id_ne?: Maybe<Scalars['ObjectId']>;
  _id_lt?: Maybe<Scalars['ObjectId']>;
  _partition_exists?: Maybe<Scalars['Boolean']>;
};

export enum ProjectSortByInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  PartitionAsc = '_PARTITION_ASC',
  PartitionDesc = '_PARTITION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type ProjectUpdateInput = {
  _partition?: Maybe<Scalars['String']>;
  _partition_unset?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_unset?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['ObjectId']>;
  _id_unset?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects: Array<Maybe<Project>>;
  task?: Maybe<Task>;
  tasks: Array<Maybe<Task>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryProjectArgs = {
  query?: Maybe<ProjectQueryInput>;
};


export type QueryProjectsArgs = {
  sortBy?: Maybe<ProjectSortByInput>;
  query?: Maybe<ProjectQueryInput>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryTaskArgs = {
  query?: Maybe<TaskQueryInput>;
};


export type QueryTasksArgs = {
  query?: Maybe<TaskQueryInput>;
  limit?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<TaskSortByInput>;
};


export type QueryUserArgs = {
  query?: Maybe<UserQueryInput>;
};


export type QueryUsersArgs = {
  query?: Maybe<UserQueryInput>;
  limit?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<UserSortByInput>;
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ObjectId'];
  _partition?: Maybe<Scalars['String']>;
  assignee?: Maybe<User>;
  name: Scalars['String'];
  status: Scalars['String'];
};

export type TaskAssigneeRelationInput = {
  link?: Maybe<Scalars['String']>;
  create?: Maybe<UserInsertInput>;
};

export type TaskInsertInput = {
  name: Scalars['String'];
  status: Scalars['String'];
  _id?: Maybe<Scalars['ObjectId']>;
  _partition?: Maybe<Scalars['String']>;
  assignee?: Maybe<TaskAssigneeRelationInput>;
};

export type TaskQueryInput = {
  name_exists?: Maybe<Scalars['Boolean']>;
  _partition_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_gt?: Maybe<Scalars['String']>;
  _id_exists?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  status_gt?: Maybe<Scalars['String']>;
  status_lte?: Maybe<Scalars['String']>;
  AND?: Maybe<Array<TaskQueryInput>>;
  _id_lte?: Maybe<Scalars['ObjectId']>;
  _partition_gte?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  OR?: Maybe<Array<TaskQueryInput>>;
  _id_nin?: Maybe<Array<Maybe<Scalars['ObjectId']>>>;
  _partition_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition_exists?: Maybe<Scalars['Boolean']>;
  _id_in?: Maybe<Array<Maybe<Scalars['ObjectId']>>>;
  assignee_exists?: Maybe<Scalars['Boolean']>;
  _id_gt?: Maybe<Scalars['ObjectId']>;
  assignee?: Maybe<UserQueryInput>;
  status_lt?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  _partition_ne?: Maybe<Scalars['String']>;
  name_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_gte?: Maybe<Scalars['ObjectId']>;
  status_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  status_exists?: Maybe<Scalars['Boolean']>;
  name_gte?: Maybe<Scalars['String']>;
  status_ne?: Maybe<Scalars['String']>;
  _partition_gt?: Maybe<Scalars['String']>;
  _id_ne?: Maybe<Scalars['ObjectId']>;
  _partition_lt?: Maybe<Scalars['String']>;
  status_gte?: Maybe<Scalars['String']>;
  _id_lt?: Maybe<Scalars['ObjectId']>;
  status_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition?: Maybe<Scalars['String']>;
  name_ne?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
};

export enum TaskSortByInput {
  AssigneeDesc = 'ASSIGNEE_DESC',
  NameAsc = 'NAME_ASC',
  PartitionAsc = '_PARTITION_ASC',
  PartitionDesc = '_PARTITION_DESC',
  AssigneeAsc = 'ASSIGNEE_ASC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  NameDesc = 'NAME_DESC'
}

export type TaskUpdateInput = {
  name_unset?: Maybe<Scalars['Boolean']>;
  status_unset?: Maybe<Scalars['Boolean']>;
  _partition_unset?: Maybe<Scalars['Boolean']>;
  assignee_unset?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['ObjectId']>;
  assignee?: Maybe<TaskAssigneeRelationInput>;
  _partition?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  _id_unset?: Maybe<Scalars['Boolean']>;
};

export type UpdateManyPayload = {
  __typename?: 'UpdateManyPayload';
  matchedCount: Scalars['Int'];
  modifiedCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  _partition?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserInsertInput = {
  image?: Maybe<Scalars['String']>;
  _partition?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserQueryInput = {
  name_gte?: Maybe<Scalars['String']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  image?: Maybe<Scalars['String']>;
  _partition_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_ne?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _partition_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_lt?: Maybe<Scalars['String']>;
  _partition?: Maybe<Scalars['String']>;
  _partition_gte?: Maybe<Scalars['String']>;
  _id_gte?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  _id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id_exists?: Maybe<Scalars['Boolean']>;
  _id_gt?: Maybe<Scalars['String']>;
  image_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_ne?: Maybe<Scalars['String']>;
  _id_lte?: Maybe<Scalars['String']>;
  _partition_lt?: Maybe<Scalars['String']>;
  _partition_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  AND?: Maybe<Array<UserQueryInput>>;
  name?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<UserQueryInput>>;
  name_nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_lt?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  _partition_ne?: Maybe<Scalars['String']>;
  name_ne?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  _partition_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  _partition_exists?: Maybe<Scalars['Boolean']>;
};

export enum UserSortByInput {
  ImageDesc = 'IMAGE_DESC',
  PartitionAsc = '_PARTITION_ASC',
  PartitionDesc = '_PARTITION_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  ImageAsc = 'IMAGE_ASC'
}

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>;
  name_unset?: Maybe<Scalars['Boolean']>;
  image?: Maybe<Scalars['String']>;
  image_unset?: Maybe<Scalars['Boolean']>;
  _partition?: Maybe<Scalars['String']>;
  _partition_unset?: Maybe<Scalars['Boolean']>;
  _id?: Maybe<Scalars['String']>;
  _id_unset?: Maybe<Scalars['Boolean']>;
};

export type GetAllTasksQueryVariables = {};


export type GetAllTasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'status'>
    & { assignee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'image'>
    )> }
  )>> }
);

export type AddTaskMutationVariables = {
  task: TaskInsertInput;
};


export type AddTaskMutation = (
  { __typename?: 'Mutation' }
  & { task?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'status'>
    & { assignee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'image'>
    )> }
  )> }
);

export type UpdateTaskMutationVariables = {
  taskId: Scalars['ObjectId'];
  updates: TaskUpdateInput;
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { task?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'status'>
    & { assignee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'image'>
    )> }
  )> }
);

export type DeleteTaskMutationVariables = {
  taskId: Scalars['ObjectId'];
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deletedTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, '_id' | 'name' | 'status'>
    & { assignee?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'image'>
    )> }
  )> }
);

export type GetUserQueryVariables = {
  userId: Scalars['String'];
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'image'>
  )> }
);
