import Realm from 'realm';
// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-order-schema
class Order extends Realm.Object<Order> {
  id!: Realm.BSON.ObjectId;
  name!: string;
  customer!: Realm.Object;

  static schema = {
    name: 'Order',
    properties: {
      id: 'objectId',
      name: 'string',
      customer: {
        type: 'linkingObjects',
        objectType: 'Customer',
        property: 'orders',
      },
    },
  };
}
// :snippet-end:
export default Order;
