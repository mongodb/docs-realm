class Invoice extends Realm.Object<Invoice> {
  _id!: string;
  item!: string;
  quantity!: number;
  price!: number;

  static schema = {
    name: 'Invoice',
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
