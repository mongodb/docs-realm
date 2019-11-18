const PersonSchema = {
  name: "Person",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    dogs: {
      type: "linkingObjects",
      objectType: "Dog",
      property: "owner"
    }
  }
};
