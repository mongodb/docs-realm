class Employee extends Realm.Object {
  _id!: string;
  first_name!: string;

  static schema = {
    name: 'Employee',
    properties: {
      _id: 'string',
      first_name: {type: 'string', mapTo: 'firstName'},
    },
    primaryKey: '_id',
  };
}
