var config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    flexible: true,
    error: (_session, error) => {
      console.log(error.name, error.message);
    },
  },
};
const realm = await Realm.open(config);
