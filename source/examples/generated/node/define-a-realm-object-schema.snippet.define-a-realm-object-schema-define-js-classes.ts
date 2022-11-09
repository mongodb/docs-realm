class Car extends Realm.Object<Car> {
  make!: string;
  model!: string;
  miles!: number;

  static schema = {
    name: "Car",
    properties: {
      make: "string",
      model: "string",
      miles: "int",
    },
  };
}
