import Realm, { BSON, Counter, ObjectSchema } from "realm";

export class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  name!: String;
  status?: String;
  progressMinutes?: Number;
  owner?: String;
  dueDate?: Date;

  static schema: ObjectSchema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string?",
      progressMinutes: "int?",
      owner: "string?",
      dueDate: "date?",
    },
    primaryKey: "_id",
  };
}

// :snippet-start: declare-counter-schema
export class ClassWithCounter extends Realm.Object<ClassWithCounter> {
  _id!: BSON.ObjectId;
  myCounter!: Counter;
  nullableCounter?: Counter | null;

  static schema: ObjectSchema = {
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
