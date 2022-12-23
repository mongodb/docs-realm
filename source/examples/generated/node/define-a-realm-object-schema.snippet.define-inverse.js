class CarOwner {
  static schema = {
    name: "CarOwner",
    properties: {
      _id: "objectId",
      // A car owner can have many cars
      cars: "Car[]"
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
      // Backlink to the CarOwner. This is automatically updated whenever
      // this car is added to or removed from a CarOwner's cars list.
      assignee: {
        type: 'linkingObjects',
        objectType: 'CarOwner',
        property: 'cars'
      }
    },
  };
}
