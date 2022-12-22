class CarOwner {
  static schema = {
    name: "CarOwner",
    properties: {
      _id: { type: "objectId", indexed: true },
      firstName: "string",
      last_name: { type: "string", mapTo: "lastName" },
      numberOfCarsOwned: { type: "int", default: 0 },
    },
    primaryKey: '_id',
  };
}
