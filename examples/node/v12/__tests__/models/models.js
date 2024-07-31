import Realm, { BSON } from "realm";

// :snippet-start: declare-counter-schema
export class ClassWithCounter extends Realm.Object {
  static schema = {
    name: "ClassWithCounter",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      myCounter: { type: "int", presentation: "counter" },
      // or myCounter: "counter"
      nullableCounter: { type: "int", presentation: "counter", optional: true },
      // or nullableCounter: "counter?"
    },
  };
}
// :snippet-end:

// :snippet-start: define-an-object-model
export class QuickstartTask extends Realm.Object {
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}
// :snippet-end:
