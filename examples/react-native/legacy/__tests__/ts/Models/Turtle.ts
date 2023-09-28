import Realm, {BSON} from 'realm';

class Turtle extends Realm.Object {
  _id!: BSON.ObjectId;
  owner_id!: BSON.ObjectId;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Turtle',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'objectId',
    },
    primaryKey: '_id',
  };
}

export default Turtle;
