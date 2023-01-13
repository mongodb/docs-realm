class Business extends Realm.Object {
  _id!: string;
  name!: string;
  addresses?: Realm.List<Address>;
  
  static schema = {
    name: "Business",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      addresses: { type: "list?", objectType: "Address" }, // Embed an array of objects
    },
  };
}
