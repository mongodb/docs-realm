final stream = realm.syncSession.getProgressStream(
    ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);

late StreamSubscription streamListener;
streamListener = stream.listen((syncProgressEvent) {
  final progressEstimate = syncProgressEvent.progressEstimate;

  if (progressEstimate < 1.0) {
    print('Upload progress: ${progressEstimate * 100}%');
  }
}, onDone: () {
  print("Upload complete");
}, onError: (error) {
  print("An error occurred: $error");
  streamListener.cancel();
});
