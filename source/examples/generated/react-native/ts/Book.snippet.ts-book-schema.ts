class Book extends Realm.Object<Book> {
  name!: string;
  price?: number;

  static schema = {
    name: 'Book',
    properties: {
      name: { type: 'string', indexed: true },
      price: 'int?',
    },
  };
}  