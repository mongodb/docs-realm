import Realm, { BSON, ObjectSchema } from "realm";

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
