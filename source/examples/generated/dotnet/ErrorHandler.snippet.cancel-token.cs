var syncConfig = new FlexibleSyncConfiguration(user);
try
{
    var cts = new CancellationTokenSource(TimeSpan.FromMinutes(2));
    await Realm.GetInstanceAsync(syncConfig, cts.Token);
}

catch (OperationCanceledException)
{
    Realm.GetInstance(syncConfig);
}
