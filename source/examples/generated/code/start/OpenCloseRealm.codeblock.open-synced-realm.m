RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
// Log in...
RLMUser *user = [app currentUser];
NSString *partitionValue = @"some partition value";

RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];

[RLMRealm asyncOpenWithConfiguration:configuration
                       callbackQueue:dispatch_get_main_queue()
                            callback:^(RLMRealm *realm, NSError *error) {
    
    if (error != nil) {
        NSLog(@"Failed to open realm: %@", [error localizedDescription]);
        return;
    }

    NSLog(@"Successfully opened realm");
    // Use realm
}];