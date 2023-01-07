class Order extends Realm.Object<Order> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  customer!: Realm.Object;

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
