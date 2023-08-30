const config: Realm.Configuration = {
  schema: [DoggieSchema],
  sync: {
    flexible: true,
    user: app.currentUser!,
    // When `true`, upload and download waits are canceled on any
    // error, such as a timeout, instead of just a fatal error.
    cancelWaitsOnNonFatalError: true,
  },
};
