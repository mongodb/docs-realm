import Realm from 'realm';

// :snippet-start: js-customer-schema
class Customer extends Realm.Object {
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
