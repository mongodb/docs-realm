const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    name: 'string',
    owner: 'string?',
    status: 'string',
  },
  primaryKey: '_id',
};

const UserSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    _partition: 'string',
    memberOf: 'Project[]',
    name: 'string',
  },
  primaryKey: '_id',
};

const ProjectSchema = {
  name: 'Project',
  embedded: true,
  properties: {
    name: 'string?',
    partition: 'string?',
  },
};

exports.ProjectSchema = ProjectSchema;
exports.TaskSchema = TaskSchema;
exports.UserSchema = UserSchema;
