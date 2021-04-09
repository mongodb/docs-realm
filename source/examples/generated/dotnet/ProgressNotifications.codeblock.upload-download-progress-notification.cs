var realm = await Realm.GetInstanceAsync(config); // predefined SyncConfiguration
var session = realm.GetSession();
var token = session.GetProgressObservable(ProgressDirection.Upload, ProgressMode.ReportIndefinitely)
    .Subscribe(progress =>
       {
           progressNotificationTriggered = true;
           Console.WriteLine($"transferred bytes: {progress.TransferredBytes}");
           Console.WriteLine($"transferable bytes: {progress.TransferableBytes}");
       });
