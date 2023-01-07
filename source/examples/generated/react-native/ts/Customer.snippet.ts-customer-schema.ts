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
