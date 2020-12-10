NSError *error = nil;
RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration
                                             error:&error];

if (error != nil) {
    NSLog(@"Failed to open realm: %@", [error localizedDescription]);
    // handle error
} else {
    NSLog(@"Opened realm: %@", realm);
    // Use realm
}