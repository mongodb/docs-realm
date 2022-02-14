const syncSession = Realm.App.Sync.getSyncSession(
  app.currentUser,
  config.sync.partitionValue
);
syncSession.addProgressNotification(
  "upload",
  "reportIndefinitely",
  (transferred, transferable) => {
    // signifies all data transferred
    if (transferred === transferable) {
      lastSyncedRealm.write(() => {
        lastSyncedRealm.create(
          "LastSynced",
          {
            realmTracked: "Dog",
            timestamp: Date.now(),
          },
          "modified"
        );
      });
    }
  }
);
