const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    name: "string",
    owner: "string?",
    status: "string",
  },
  primaryKey: "_id",
};
