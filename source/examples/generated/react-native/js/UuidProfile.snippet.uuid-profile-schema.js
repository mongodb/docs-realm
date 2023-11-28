class UuidProfile extends Realm.Object {
  static schema = {
    name: 'UuidProfile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
