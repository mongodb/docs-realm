const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    priority: "int?",
    progressMinutes: "int?",
  },
  primaryKey: "_id",
};

const PersonSchema = {
  name: "Person",
  properties: {
    name: "string",
    age: "int?",
  },
};
const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    owner: "Person?",
    age: "int?",
  },
};

const CatSchema = {
  name: "Cat",
  properties: {
    name: "string",
  },
};
