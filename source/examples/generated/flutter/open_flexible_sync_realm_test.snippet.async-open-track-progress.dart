final realm = await Realm.open(config, onProgressCallback: (syncProgress) {
      progress = syncProgress.progressEstimate;
      // Percent complete == progress * 100
    if (syncProgress.progressEstimate == 1.0) {
       //transfer is complete
    }
});
