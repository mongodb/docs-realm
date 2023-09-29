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

/*
  Quick Start Object Model
*/

// :snippet-start: setup-define-model
// Define your object model
export class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}
// :snippet-end:
