const config: Realm.Configuration = {
  schema: [DogSchema],
  sync: {
    flexible: true,
    user: app.currentUser!,
    onError: (session, syncError) => {
      // Call your Sync error handler.
      handleSyncError(session, syncError);
    },
  },
};

// Open realm with config that contains error handler.
const realm = await Realm.open(config);

const handleSyncError = (
  session: Realm.App.Sync.Session,
  error: Realm.SyncError | Realm.ClientResetError
) => {
  // ... handle the error using session and error information.
  console.log(session);
  console.log(error);
};
