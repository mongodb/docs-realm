const UserSchema = {
  name: "User",
  properties: {
    _id: "string",
    memberOf: "Project[]",
    name: "string",
  },
  primaryKey: "_id",
};
