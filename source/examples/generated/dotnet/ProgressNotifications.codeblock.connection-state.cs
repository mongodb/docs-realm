public async Task SetupRealm()
{
    var appConfig = new AppConfiguration(myRealmAppId);
    app = App.Create(appConfig);
    user = app.LogInAsync(Credentials.Anonymous()).Result;
    config = new PartitionSyncConfiguration("myPartition", user);
    try
    {
        var realm = Realm.GetInstance(config);
        var session = realm.SyncSession;
        session.PropertyChanged += SyncSession_PropertyChanged;
        realm.Dispose();
    }
    catch (Exception ex)
    {

    }
}

private void SyncSession_PropertyChanged(object sender, PropertyChangedEventArgs e)
{
    if (e.PropertyName == nameof(Session.ConnectionState))
    {
        var session = (Session)sender;
        var currentState = session.ConnectionState;

        if (currentState == ConnectionState.Connecting)
        {
            //session is connecting
        }

        if (currentState == ConnectionState.Connected)
        {
            //session is connected
        }

        if (currentState == ConnectionState.Disconnected)
        {
            //session has been disconnected
        }
    }
}
