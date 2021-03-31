// Access the sync manager for the app
RLMSyncManager *syncManager = [app syncManager];

syncManager.errorHandler = ^(NSError *error, RLMSyncSession *session) {
    // handle error
};
