const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
  },
};
const config = {
  sync: syncConfig, // a predefined sync configuration object
  schema: [DogSchema],
};
const realm = await Realm.open(config);
realm.write(() => {
  realm.create("Dog", { name: "Spot" });
});
