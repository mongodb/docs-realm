RLMApp *app = [RLMApp appWithId:@"<YourAppId>"]; // replace this with your App ID
[app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to log in: %@", error);
        return;
    }
    
    // One way to use custom data:
    NSLog(@"User custom data: %@", [user customData]);
    
    // Another way to use custom data: refresh in case the client-side data is stale
    [user refreshCustomDataWithCompletion:^(NSDictionary *customData, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to refresh custom user data: %@", error);
            return;
        }
        NSLog(@"Favorite color: %@", customData[@"favoriteColor"]);
    }];
}];
