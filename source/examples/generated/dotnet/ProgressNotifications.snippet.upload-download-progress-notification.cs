var session = realm.SyncSession;
var token = session.GetProgressObservable(ProgressDirection.Upload,
    ProgressMode.ReportIndefinitely)
    .Subscribe(progress =>
       {
           Console.WriteLine($@"transferred bytes:
                {progress.TransferredBytes}");
           Console.WriteLine($@"transferable bytes:
                {progress.TransferableBytes}");
       });
