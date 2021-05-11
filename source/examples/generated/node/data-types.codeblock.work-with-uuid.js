const { UUID } = Realm.BSON;
const ProfileSchema = {
  name: "Profile",
  primaryKey: "_id",
  properties: {
    _id: "uuid",
    name: "string",
  },
};
const realm = await Realm.open({
  schema: [ProfileSchema],
});
realm.write(() => {
  realm.create("Profile", {
    name: "John Doe.",
    _id: new UUID(),
  });
});
