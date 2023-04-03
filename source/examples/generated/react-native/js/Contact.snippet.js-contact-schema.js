class Contact extends Realm.Object {
  static schema = {
    name: "Contact",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      address: "Address", // Embed a single object
    },
  };
}
