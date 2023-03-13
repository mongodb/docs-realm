import Realm from 'realm';

class Bird extends Realm.Object<Bird> {
  _id!: string;
  owner_id!: string;
  name!: string;
  haveSeen!: boolean;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Bird',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
      haveSeen: 'bool',
    },
    primaryKey: '_id',
  };
}

export default Bird;