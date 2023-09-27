import Realm, {BSON, ObjectSchema} from 'realm';

// Remove "export " from object model examples.
// :replace-start: {
//    "terms": {
//       "export ": ""
//    }
// }

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
  Begin relationship object models
*/

// :snippet-start: define-one-to-one
export class ToOneManufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  car?: Car;

  static schema: Realm.ObjectSchema = {
    name: 'ToOneManufacturer',
    properties: {
      _id: 'objectId',
      name: 'string',
      // A manufacturer that may have one car
      car: 'Car?',
    },
  };
}

export class Car extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;

  static schema: Realm.ObjectSchema = {
    name: 'Car',
    properties: {
      _id: 'objectId',
      model: 'string',
      miles: 'int?',
    },
  };
}
// :snippet-end:

// :snippet-start: define-one-to-many
export class ToManyManufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  cars!: Realm.List<LinkedCar>;

  static schema: Realm.ObjectSchema = {
    name: 'ToManyManufacturer',
    properties: {
      _id: 'objectId',
      name: 'string',
      // A manufacturer that may have many cars
      cars: 'LinkedCar[]',
    },
  };
}

export class LinkedCar extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;
  manufacturer!: Realm.Collection<ToManyManufacturer>;

  static schema: Realm.ObjectSchema = {
    name: 'LinkedCar',
    properties: {
      _id: 'objectId',
      model: 'string',
      miles: 'int?',
      manufacturer: {
        type: 'linkingObjects',
        objectType: 'ToManyManufacturer',
        property: 'cars',
      },
    },
  };
}
// :snippet-end:

// :snippet-start: define-inverse
export class ManufacturerInverse extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  cars!: Realm.List<CarInverse>;

  static schema: Realm.ObjectSchema = {
    name: 'ManufacturerInverse',
    properties: {
      _id: 'objectId',
      name: 'string',
      // A manufacturer that may have many cars
      cars: 'CarInverse[]',
    },
  };
}

export class CarInverse extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;
  manufacturer!: Realm.List<ManufacturerInverse>;

  static schema: Realm.ObjectSchema = {
    name: 'CarInverse',
    properties: {
      _id: 'objectId',
      model: 'string',
      miles: 'int?',
      manufacturer: {
        type: 'linkingObjects',
        objectType: 'ManufacturerInverse',
        property: 'cars',
      },
    },
  };
}
// :snippet-end:

// :snippet-start: define-embedded-property
export class Manufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  cars!: Realm.List<CarWithEmbed>;
  warranties!: Realm.List<Warranty>;

  static schema: Realm.ObjectSchema = {
    name: 'Manufacturer',
    properties: {
      _id: 'objectId',
      name: 'string',
      cars: 'CarWithEmbed[]',
      // Embed an array of objects
      warranties: 'Warranty[]',
    },
  };
}

export class CarWithEmbed extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;
  warranty?: Warranty;

  static schema: Realm.ObjectSchema = {
    name: 'CarWithEmbed',
    properties: {
      _id: 'objectId',
      model: 'string',
      miles: 'int?',
      // Embed one object
      warranty: 'Warranty?',
    },
  };
}

export class Warranty extends Realm.Object {
  name!: string;
  termLength!: number;
  cost!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Warranty',
    embedded: true,
    properties: {
      name: 'string',
      termLength: 'int',
      cost: 'int',
    },
  };
}
// :snippet-end:

/*
  End relationship object models
*/

// :replace-end:
