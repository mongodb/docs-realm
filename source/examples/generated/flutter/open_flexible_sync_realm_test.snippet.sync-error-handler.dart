final config = Configuration.flexibleSync(currentUser, [Tricycle.schema],
    syncErrorHandler: (SyncError error) {
  print("Error message" + error.message.toString());
});
final realm = Realm(config);
