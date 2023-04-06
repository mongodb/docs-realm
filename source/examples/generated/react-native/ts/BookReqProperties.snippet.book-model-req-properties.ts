class Book extends Realm.Object<Book, 'name' | 'store'> {
  name!: string;
  store!: string;
  price?: number;

  static schema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: true},
      store: 'string',
      price: 'int?',
    },
  };
}
