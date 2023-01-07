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
