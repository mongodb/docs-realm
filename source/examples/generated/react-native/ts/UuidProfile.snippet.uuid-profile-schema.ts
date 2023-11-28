class UuidProfile extends Realm.Object<UuidProfile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema: ObjectSchema = {
    name: 'UuidProfile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
