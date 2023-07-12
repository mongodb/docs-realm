// :snippet-start: rql-data-models
const ItemModel = {
  name: "Item",
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
    projects: {
      type: "linkingObjects",
      objectType: "Project",
      property: "items",
    },
  },
  primaryKey: "id",
};

const ProjectModel = {
  name: "Project",
  properties: {
    id: "objectId",
    name: "string",
    items: "Item[]",
    quota: "int?",
  },
  primaryKey: "id",
};
// :snippet-end:

export { ItemModel, ProjectModel };
