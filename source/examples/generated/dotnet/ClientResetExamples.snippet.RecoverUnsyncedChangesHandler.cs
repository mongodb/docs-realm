
var conf = new PartitionSyncConfiguration(partition, user)
{
    ClientResetHandler = new RecoverUnsyncedChangesHandler
    {
        // The following callbacks are optional
        OnBeforeReset = (beforeFrozen) =>
        {
            // Executed before the client reset begins
            // Can be used to notify the user that a reset is going to happen.
        },
        OnAfterReset = (beforeFrozen, after) =>
        {
            // Executed after the client reset is complete
        },
        ManualResetFallback = (err) =>
        {
            // Automatic reset failed; handle the reset manually here
        }
    }
};
