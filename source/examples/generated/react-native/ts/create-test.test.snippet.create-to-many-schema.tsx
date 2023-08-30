class Employee extends Realm.Object<Employee> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  birthdate!: Date;

  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date',
    },
  };
}

class Company extends Realm.Object<Company> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  employees!: Realm.List<Employee>
  
  static schema = {
    name: 'Company',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      employees: {
        type: 'list',
        objectType: 'Employee',
        optional: false,
      },
    },
  };
}
