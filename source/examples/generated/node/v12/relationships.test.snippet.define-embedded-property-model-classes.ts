class Manufacturer extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  cars!: Realm.List<Car>;
  warranties!: Realm.List<Warranty>;

  static schema: Realm.ObjectSchema = {
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
  _id!: Realm.BSON.ObjectId;
  model!: string;
  miles?: number;
  warranty?: Warranty;

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
  name!: string;
  termLength!: number;
  cost!: number;

  static schema: Realm.ObjectSchema = {
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
