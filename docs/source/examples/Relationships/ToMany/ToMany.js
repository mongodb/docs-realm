const Person = {
  name: "Person",
  properties: {
    name: "string",
    birthdate: "date",
    dogs: "Dog[]"
  }
};

const Dog = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int",
    breed: "string?"
  }
};
