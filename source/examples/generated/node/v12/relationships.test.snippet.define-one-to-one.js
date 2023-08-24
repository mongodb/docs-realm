class Manufacturer extends Realm.Object {
  static schema = {
    name: "Manufacturer",
    properties: {
      _id: {
        type: "objectId",
      },
      name: {
        type: "string",
      },
      // A manufacturer that may have one car
      car: {
        type: "object",
        objectType: "Car",
        optional: true,
      },
    },
  };
}

class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      _id: {
        type: "objectId",
      },
      model: {
        type: "string",
      },
      miles: {
        type: "int",
        optional: true,
      },
    },
  };
}
