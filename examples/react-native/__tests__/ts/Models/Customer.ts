import Realm from 'realm';
import Order from './Order';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-customer-schema
class Customer extends Realm.Object<Customer> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  orders!: Realm.List<Order>;

  static schema = {
    name: 'Customer',
    properties: {
      _id: 'objectId',
      name: 'string',
      orders: 'Order[]',
    },
    primaryKey: '_id',
  };
}
// :snippet-end:
export default Customer;
