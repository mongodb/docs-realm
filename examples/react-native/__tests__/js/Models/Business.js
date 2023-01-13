import Realm from 'realm';

// :snippet-start: js-business-schema
class Business extends Realm.Object {
  static schema = {
    name: "Business",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      addresses: { type: "list?", objectType: "Address" }, // Embed an array of objects
    },
  };
}
// :snippet-end:
export default Business;
