// Specify the clientResetMode when you create the SyncConfiguration.
// If you do not specify, this defaults to `.manual` mode.
var configuration = user.configuration(partitionValue: "myPartition", clientResetMode: .discardLocal(beforeClientResetBlock, afterClientResetBlock))
