Configuration config =
    Configuration.flexibleSync(currentUser, [Tricycle.schema]);
Realm fullySyncedRealm =
    await Realm.open(config, onProgressCallback: (syncProgress) {
  if (syncProgress.transferableBytes == syncProgress.transferredBytes) {
    print('All bytes transferred!');
  }
});
