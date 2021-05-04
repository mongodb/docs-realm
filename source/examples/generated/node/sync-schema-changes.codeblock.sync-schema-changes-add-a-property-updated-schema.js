const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    owner: "Person",
  },
};
const PersonSchema = {
  name: "Person",
  properties: {
    name: "string",
    birthdate: "date",
  },
};
const config = {
  sync: syncConfig, // a predefined sync configuration object
  schema: [DogSchema, PersonSchema],
};
const realm = await Realm.open(config);
