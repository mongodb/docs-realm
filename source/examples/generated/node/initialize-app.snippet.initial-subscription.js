// Define team schema
const TeamSchema = {
  name: "Team",
  properties: {
    _id: "int",
    name: "string",
    description: "string?",
  },
  primaryKey: "_id",
};

// Create config object for your realm
const config = {
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm.objects("Team").filtered("name == 'Developer Education'")
        );
      },
    },
  },
};

const realm = await Realm.open(config);
