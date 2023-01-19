import Realm from 'realm';
import Address from './Address';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-business-schema
class Business extends Realm.Object {
  _id!: string;
  name!: string;
  addresses!: Realm.List<Address>;
  static schema = {
    name: "Business",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      addresses: { type: "list", objectType: "Address" }, // Embed an array of objects
    },
  };
}
// :snippet-end:
export default Business;
