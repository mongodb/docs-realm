class Order extends Realm.Object {
  static schema = {
    name: "Order",
    properties: {
      id: "objectId",
      name: "string",
      customer: {
        type: "linkingObjects",
        objectType: "Customer",
        property: "orders",
      },
    },
  };
}
