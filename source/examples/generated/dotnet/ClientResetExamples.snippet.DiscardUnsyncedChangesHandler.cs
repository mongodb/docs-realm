{
    var config = new PartitionSyncConfiguration("myPartition", user);
    config.ClientResetHandler = new DiscardUnsyncedChangesHandler()
    {
        // The following callbacks are optional
        OnBeforeReset = (beforeReset) =>
        {
            // Executed before the client reset begins
            // Can be used to notify the user that a reset is going to happen.
        },
        OnAfterReset = (beforeReset, afterReset) =>
        {
            // Executed after the client reset is complete
        },
        ManualResetFallback = (err) =>
        {
            // Automatic reset failed; handle the reset manually here
        }
    };

    var realm = await Realm.GetInstanceAsync(config);
