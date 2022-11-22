class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      make: "string",
      model: "string",
      miles: "int",
    },
  };
  constructor(make, model, miles) {
    const milesRounded = Math.round(miles);

    this.make = make;
    this.model = model;
    this.miles = milesRounded;
  }
}
