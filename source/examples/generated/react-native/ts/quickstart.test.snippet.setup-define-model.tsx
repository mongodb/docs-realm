// Define your object model
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
    primaryKey: '_id',
  };
}
