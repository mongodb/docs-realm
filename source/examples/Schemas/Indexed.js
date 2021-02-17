const BookSchema = {
  name: "Book",
  properties: {
    name: { type: "string", indexed: true },
    price: "int",
  },
};
