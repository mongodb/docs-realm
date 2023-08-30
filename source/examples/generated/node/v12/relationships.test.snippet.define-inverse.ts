class Manufacturer extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  cars!: Realm.List<Car>;

  static schema: Realm.ObjectSchema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      name: "string",
      // A manufacturer that may have many cars
      cars: "Car[]",
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
      _id: "objectId",
      model: "string",
      miles: "int?",
      manufacturer: {
        type: "linkingObjects",
        objectType: "Manufacturer",
        property: "cars",
      },
    },
  };
}
