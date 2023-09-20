import Realm, {BSON, ObjectSchema} from 'realm';
import {Person} from './Person';

class Turtle extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  owner?: Person;
  age!: number;

  static schema: ObjectSchema = {
    name: 'Turtle',
    properties: {
      _id: 'objectId',
      name: 'string',
      owner: 'Person?',
      age: 'int',
    },
    primaryKey: '_id',
  };
}
