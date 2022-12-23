class Manufacturer {
  static schema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      // A manufactuerer that may have many cars
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
    },
  };
}
