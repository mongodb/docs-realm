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
