class CarOwner {
  static schema = {
    name: "CarOwner",
    properties: {
      _id: "objectId",
      // A car owner can have one car
      car: "Car?"
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
    },
  };
}
