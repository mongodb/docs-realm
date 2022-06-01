RLMSyncSession *syncSession = [syncedRealm syncSession];
RLMProgressNotificationToken *token = [syncSession
       addProgressNotificationForDirection:RLMSyncProgressDirectionUpload
                                      mode:RLMSyncProgressModeForCurrentlyOutstandingWork
                                     block:^(NSUInteger transferredBytes, NSUInteger transferrableBytes) {
    NSLog(@"Uploaded %luB / %luB", (unsigned long)transferredBytes, transferrableBytes);
}];

// Upload something
[syncedRealm transactionWithBlock:^{
    [syncedRealm addObject:[[Task alloc] init]];
}];
