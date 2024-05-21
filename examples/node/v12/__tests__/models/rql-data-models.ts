import Realm, { BSON, ObjectSchema } from "realm";

// Models for embedded objects & dot notation queries
export class Address extends Realm.Object<Address> {
  name!: string;
  street!: string;
  zipcode!: number;

  static schema: ObjectSchema = {
    name: "Address",
    embedded: true,
    properties: {
      name: "string",
      street: "string",
      zipcode: "int",
    },
  };
}

export class Office extends Realm.Object<Office> {
  name!: string;
  address!: Address;

  static schema: ObjectSchema = {
    name: "Office",
    properties: {
      name: "string",
      address: "Address",
    },
  };
}

// :snippet-start: rql-data-models
export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  name!: string;
  isComplete!: boolean;
  assignee?: string;
  priority!: number;
  progressMinutes?: number;

  static schema: ObjectSchema = {
    name: "Item",
    properties: {
      _id: "objectId",
      name: { type: "string", indexed: "full-text" },
      isComplete: { type: "bool", default: false },
      assignee: "string?",
      priority: { type: "int", default: 0 },
      progressMinutes: { type: "int", default: 0 },
      projects: {
        type: "linkingObjects",
        objectType: "Project",
        property: "items",
      },
    },
    primaryKey: "_id",
  };
}
export class Project extends Realm.Object<Project> {
  _id!: BSON.ObjectId;
  name!: string;
  items!: Realm.List<Item>;
  quota?: number;
  comments?: Realm.Dictionary<string>;
  projectLocation?: Office;

  static schema: ObjectSchema = {
    name: "Project",
    properties: {
      _id: "objectId",
      name: "string",
      items: "Item[]",
      quota: "int?",
      comments: "string?{}",
      projectLocation: "Office?",
    },
    primaryKey: "_id",
  };
}
// :snippet-end:
