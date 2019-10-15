{
  name: "Person",
  properties: {
    name: "string",
    birthdate: "date",
    dogs: "Dog[]"
  }
}

{
  name: "Dog",
  properties: {
    name: "string",
    age: "int",
    breed: "string?",
    owners: {
      type: 'linkingObjects',
      objectType: 'Person',
      property: 'dogs'
    }
  }
};
