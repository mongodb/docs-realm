RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];

// ... log in ...

RLMUser *user = [app currentUser];

// Call sum function
[user callFunctionNamed:@"sum"
              arguments:@[@1, @2]
        completionBlock:^(id<RLMBSON> result, NSError *error) {
    if (error) {
        NSLog(@"Function call failed: %@", [error localizedDescription]);
        return;
    }
    NSLog(@"Called function 'sum' and got result: %@", result);
    assert([result isEqual:@3]);
}];

