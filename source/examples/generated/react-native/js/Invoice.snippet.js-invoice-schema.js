class Invoice extends Realm.Object {
  static schema = {
    name: 'Invoice',
    // sync Invoice objects one way from your device to your Atlas database.
    asymmetric: true,
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      item: 'string',
      quantity: 'int',
      price: 'int',
    },
  };
}
