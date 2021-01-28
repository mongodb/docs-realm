const DogSchema = {
    name: "Dog",
    properties: {
      _id: "string",
      first_name: { type: 'string', mapTo: 'firstName' }
    },
    primaryKey: '_id'
};