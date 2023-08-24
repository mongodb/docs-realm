class Manufacturer extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: String;
  car?: Car;

  static schema: Realm.ObjectSchema = {
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
  _id!: Realm.BSON.ObjectId;
  model!: string;
  miles?: number;

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
    },
  };
}
