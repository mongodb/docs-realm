class Customer extends Realm.Object<Customer> {
  id!: Realm.BSON.ObjectId;
  name!: string;
  orders!: Realm.List<Order>;

  static schema = {
    name: 'Customer',
    properties: {
      id: 'objectId',
      name: 'string',
      orders: 'Order[]',
    },
  };
}
