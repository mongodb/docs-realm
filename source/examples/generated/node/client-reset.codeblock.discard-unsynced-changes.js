const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    clientReset: {
      mode: "discardLocal",
      clientResyncBefore: (realm) => {
        console.log("Beginning client reset for ", realm.path);
      },
      clientResyncAfter: (beforeRealm, afterRealm) => {
        console.log("Finished client reset for", beforeRealm.path);
        console.log("New realm path", afterRealm.path);
      },
    },
  },
};
