// :code-block-start: taskSchema
const TaskSchema = {
  // :hide-start:
  name: 'Task',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    name: 'string',
    owner: 'string?',
    status: 'string',
  },
  primaryKey: '_id',
  // :replace-with:
  // // TODO: Define the data model for tasks.

  // :hide-end:
};
// :code-block-end:

// :code-block-start: userSchema
const UserSchema = {
  // :hide-start:
  name: 'User',
  properties: {
    _id: 'string',
    _partition: 'string',
    memberOf: 'Project[]',
    name: 'string',
  },
  primaryKey: '_id',
  // :replace-with: 
  // // TODO: Define the data model for users.

  // :hide-end:
};
// :code-block-end:

// :code-block-start: projectSchema
const ProjectSchema = {
  // :hide-start:
  name: 'Project',
  embedded: true,
  properties: {
    name: 'string?',
    partition: 'string?',
  },
  // :replace-with: 
  // // TODO: Define the data model for users.

  // :hide-end:
};
// :code-block-end:

exports.ProjectSchema = ProjectSchema;
exports.TaskSchema = TaskSchema;
exports.UserSchema = UserSchema;
