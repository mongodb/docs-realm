  class Car extends Realm.Object {
    static schema = {
      name: "Car",
      properties: {
        make: "string",
        model: "string",
        miles: "int",
      },
    };
    get carName() {
      return `${this.make} ${this.model}`;
    }
}
