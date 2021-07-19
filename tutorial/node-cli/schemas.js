// :code-block-start: taskSchema
const TaskSchema = {
  // :state-start: final
  name: "Task",
  properties: {
    _id: "objectId",
    name: "string",
    owner: "string?",
    status: "string",
  },
  primaryKey: "_id",
  // :state-end: :state-uncomment-start: start
  // // TODO: Define the data model for tasks.

  // :state-uncomment-end:
};
// :code-block-end:

// :code-block-start: userSchema
const UserSchema = {
  // :state-start: final
  name: "User",
  properties: {
    _id: "string",
    memberOf: "Project[]",
    name: "string",
  },
  primaryKey: "_id",
  // :state-end: :state-uncomment-start: start
  // // TODO: Define the data model for users.

  // :state-uncomment-end:
};
// :code-block-end:

// :code-block-start: projectSchema
const ProjectSchema = {
  // :state-start: final
  name: "Project",
  embedded: true,
  properties: {
    name: "string?",
    partition: "string?",
  },
  // :state-end: :state-uncomment-start: start
  // // TODO: Define the data model for projects.

  // :state-uncomment-end:
};
// :code-block-end:

exports.ProjectSchema = ProjectSchema;
exports.TaskSchema = TaskSchema;
exports.UserSchema = UserSchema;
