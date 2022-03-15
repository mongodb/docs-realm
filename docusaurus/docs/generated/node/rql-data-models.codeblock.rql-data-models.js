const TaskModel = {
  name: "Task",
  properties: {
    id: "objectId",
    name: "string",
    isComplete: { type: "bool", default: false },
    assignee: "string?",
    priority: {
      type: "int",
      default: 0,
    },
    progressMinutes: {
      type: "int",
      default: 0,
    },
  },
  primaryKey: "id",
};

const ProjectModel = {
  name: "Project",
  properties: {
    id: "objectId",
    name: "string",
    tasks: "Task[]",
    quota: "int?",
  },
  primaryKey: "id",
};
