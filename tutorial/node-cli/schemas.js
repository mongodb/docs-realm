const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    _partition: "string?",
    assignee: "User",
    name: "string",
    status: "string",
  },
  primaryKey: "_id",
};

const UserSchema = {
  name: "User",
  properties: {
    _id: "string",
    _partition: "string?",
    image: "string?",
    name: "string",
  },
  primaryKey: "_id",
};

const ProjectSchema = {
  name: "Project",
  properties: {
    _id: "objectId",
    _partition: "string?",
    name: "string",
  },
  primaryKey: "_id",
};

exports.ProjectSchema = ProjectSchema;
exports.TaskSchema = TaskSchema;
exports.UserSchema = UserSchema;
