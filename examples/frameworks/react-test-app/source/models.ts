import Realm, { BSON } from "realm";

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  isComplete!: boolean;
  summary!: string;
  owner_id!: string;

  static schema: Realm.ObjectSchema = {
    name: "Item",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      isComplete: { type: "bool", default: false },
      summary: "string",
      owner_id: "string",
    },
  };
}
