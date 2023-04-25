realm.write(() => {
  realm.create("Invoice", {
    _id: new BSON.ObjectID(),
    item: "shirt",
    quantity: 30,
    price: 10,
  });
});
