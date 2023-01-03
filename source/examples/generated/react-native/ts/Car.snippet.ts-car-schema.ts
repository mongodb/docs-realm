class Car extends Realm.Object {
  make!: string;
  model!: string;
  miles: number = 0;

  static schema = {
    name: 'Car',
    properties: {
      make: 'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    },
  };
}
