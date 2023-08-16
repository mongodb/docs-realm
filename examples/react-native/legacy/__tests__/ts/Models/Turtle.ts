import Realm from 'realm';

class Turtle extends Realm.Object {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Turtle',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

export default Turtle;