class Car {
  static schema = {
    name: "Car",
    properties: {
      _id: "objectId",
      make: "string",
      model: "string",
      miles: "int?",
    },
    primaryKey: '_id',
  };
