final realm =
    await Realm.open(config, onProgressCallback: (syncProgress) {
  if (syncProgress.transferableBytes == syncProgress.transferredBytes) {
    print('All bytes transferred!');
  }
});
