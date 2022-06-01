RLMRealm *syncedRealm = [RLMRealm realmWithConfiguration:configuration error:nil];

RLMSyncSession *syncSession = [syncedAtlas Device SyncSession];
// Suspend synchronization
[syncSession suspend];

// Later, resume synchronization
[syncSession resume];
