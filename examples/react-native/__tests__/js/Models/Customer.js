import Realm from 'realm';

// :snippet-start: js-customer-schema
class Customer extends Realm.Object {
  static schema = {
    name: 'Customer',
    properties: {
      id: 'objectId',
      name: 'string',
      orders: 'Order[]',
    },
  };
}
// :snippet-end:
export default Customer;
