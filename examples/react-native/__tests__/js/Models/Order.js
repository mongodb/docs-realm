import Realm from 'realm';
// :snippet-start: js-order-schema
class Order extends Realm.Object {
  static schema = {
    name: 'Order',
    properties: {
      _id: 'objectId',
      name: 'string',
      customer: {
        type: 'linkingObjects',
        objectType: 'Customer',
        property: 'orders',
      },
    },
    primaryKey: '_id',
  };
}
// :snippet-end:
export default Order;
