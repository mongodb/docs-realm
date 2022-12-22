class CarOwner {
  static schema = {
    name: "CarOwner",
    properties: {
      _id: { type: "objectId", indexed: true },
      name: "string",
      numberOfCarsOwned: { type: "int", default: 0 },
    },
    primaryKey: '_id',
  };
}
