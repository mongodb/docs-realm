class Manufacturer {
  static schema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      name: "string",
      // Embed an array of objects
      warranties: { type: "list", objectType: "Warranty" }
    },
  };
}

class Car {
  static schema = {
    name: "Car",
    properties: {
      _id: "objectId",
      make: "string",
      model: "string",
      miles: "int?",
      // Embed one object
      warranty: "Warranty",
    },
  };
}

class Warranty {
  static schema = {
    name: "Warranty",
    embedded: true,
    properties: {
      name: "string",
      termLength: "int",
      cost: "int",
    },
  };
}
