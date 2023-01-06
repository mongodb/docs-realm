import Realm from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-invoice-schema
class Invoice extends Realm.Object<Invoice> {
  _id!: string;
  item!: string;
  quantity!: number;
  price!: number;

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
