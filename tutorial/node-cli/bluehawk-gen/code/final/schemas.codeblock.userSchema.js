const UserSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    _partition: 'string',
    memberOf: 'Project[]',
    name: 'string',
  },
  primaryKey: '_id',
};