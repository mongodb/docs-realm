/*
  DON'T UPDATE THIS FILE. DEPRECATED IN FAVOR OF V12 MODELS.
  Updates should be placed in the new file compatible with
  JSv12 and later, located at:
  examples/node/v12/__tests__/models/rql-data-models.ts
*/
// :snippet-start: rql-data-models
const ItemModel = {
  name: "Item",
  properties: {
    id: "objectId",
    name: {type: "string", indexed: "full-text"},
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
