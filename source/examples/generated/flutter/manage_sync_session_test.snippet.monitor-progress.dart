final stream = realm.syncSession.getProgressStream(
    ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);

late StreamSubscription streamListener;
streamListener = stream.listen((syncProgressEvent) {
  if (syncProgressEvent.transferableBytes ==
      syncProgressEvent.transferredBytes) {
    // Upload complete
    print('Upload complete');
    // Stop listening to the Stream
    streamListener.cancel();
  }
});
