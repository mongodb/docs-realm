const InvoiceSchema = {
  name: "Invoice",
  // sync Person objects unidirectionally from your device directly to your Atlas database.
  asymmetric: true,
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    item: "string",
    quantity: "int",
    price: "int",
  },
};
