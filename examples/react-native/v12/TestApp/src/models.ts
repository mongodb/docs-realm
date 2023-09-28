import Realm, {BSON, ObjectSchema} from 'realm';

export class Bird extends Realm.Object<Bird> {
  _id!: BSON.ObjectId;
  name!: string;
  haveSeen!: boolean;

  static schema: ObjectSchema = {
    name: 'Bird',
    properties: {
      _id: 'objectId',
      name: 'string',
      haveSeen: 'bool',
    },
    primaryKey: '_id',
  };
}

export class Person extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  age!: number;

  static schema: ObjectSchema = {
    name: 'Person',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
    },
    primaryKey: '_id',
  };
}

export class Turtle extends Realm.Object {
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
