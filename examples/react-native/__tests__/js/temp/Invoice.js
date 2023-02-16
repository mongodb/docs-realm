import Realm from 'realm';

// :snippet-start: js-invoice-schema
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
// :snippet-end:

export default Invoice;
