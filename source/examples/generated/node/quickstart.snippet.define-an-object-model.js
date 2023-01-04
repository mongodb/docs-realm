const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
    owner_id: "string?",
  },
  primaryKey: "_id",
};
