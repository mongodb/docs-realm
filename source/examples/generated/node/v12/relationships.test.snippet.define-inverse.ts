class Manufacturer extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: String;
  cars!: Realm.List<Car>;

  static schema: Realm.ObjectSchema = {
    name: "Manufacturer",
    properties: {
      _id: {
        type: "objectId",
      },
      name: {
        type: "string",
      },
      // A manufacturer that may have many cars
      cars: {
        type: "list",
        objectType: "Car",
      },
    },
  };
}

class Car extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  model!: string;
  miles?: number;
  manufacturer!: Realm.Collection<Manufacturer>;

  static schema: Realm.ObjectSchema = {
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
      manufacturer: {
        type: "linkingObjects",
        objectType: "Manufacturer",
        property: "cars",
      },
    },
  };
}
