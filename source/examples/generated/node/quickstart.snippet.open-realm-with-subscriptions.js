// Create a `SyncConfiguration` object.
const config = {
  sync: {
    // Use the previously-authenticated anonymous user.
    user: app.currentUser,
    // Set flexible sync to true to enable sync.
    flexible: true,
    // Define initial subscriptions to start syncing data as soon as the
    // realm is opened.
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          // Get objects that match your object model, then filter them
          // by owner id.
          realm.objects("Task").filtered(`owner_id = ${app.currentUser.id}`)
        );
      },
    },
  },
};

const realm = await Realm.open(config);
