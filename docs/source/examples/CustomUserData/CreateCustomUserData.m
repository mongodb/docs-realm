RLMApp *app = [RLMApp appWithId:@"<YourAppId>"]; // replace this with your App ID
[app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to log in: %@", error);
        return;
    }
    RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
    RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
    RLMMongoCollection *collection = [database collectionWithName:@"users"];
    [collection insertOneDocument:
        @{@"userId": [user identity], @"favoriteColor": @"pink"}
        completion:^(RLMObjectId *newObjectId, NSError *error) {
            if (error != nil) {
                NSLog(@"Failed to insert: %@", error);
            }
            NSLog(@"Inserted custom user data document with object ID: %@", newObjectId);
    }];
}];
