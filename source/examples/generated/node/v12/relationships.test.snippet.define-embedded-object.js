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
      cars: {
        type: "list",
        objectType: "Car",
      },
      // Embed an array of objects
      warranties: {
        type: "list",
        objectType: "Warranty",
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
      // Embed one object
      warranty: {
        type: "object",
        objectType: "Warranty",
        optional: true,
      },
    },
  };
}

class Warranty extends Realm.Object {
  static schema = {
    name: "Warranty",
    embedded: true,
    properties: {
      name: {
        type: "string",
      },
      termLength: {
        type: "int",
      },
      cost: {
        type: "int",
      },
    },
  };
}
