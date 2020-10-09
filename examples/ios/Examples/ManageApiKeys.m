#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface ManageApiKeys : XCTestCase

@end

@implementation ManageApiKeys

- (void)setUp {
    XCTestExpectation *expectation = [self expectationWithDescription:@"registers and logs in"];

    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID]; // Replace YOUR_REALM_APP_ID with your Realm app ID
    RLMEmailPasswordAuth *client = [app emailPasswordAuth];
    NSString *email = @"manage-api-keys-objc@example.com";
    NSString *password = @"123456";
    // User will be deleted by TestSetup after entire suite
    [client registerUserWithEmail:email password:password completion:^(NSError *error) {
        // Ignore error. May have registered on previous test.
        [app loginWithCredential:[RLMCredentials credentialsWithEmail:email password:password] completion:^(RLMUser *user, NSError *error) {
                [expectation fulfill];
            }];
    }];
    // :code-block-end:
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)tearDown {
    XCTestExpectation *expectation = [self expectationWithDescription:@"Log out"];
    [[[MyRealmApp app] currentUser] logOutWithCompletion:^(NSError *error) {
        [expectation fulfill];
    }];
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)testCreateApiKey {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :code-block-start: create-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];

    // Create the API key
    [client createAPIKeyWithName:@"someKeyName" completion:^(RLMUserAPIKey *apiKey, NSError *error) {
        if (error != nil) {
            // ... handle Error ...
        } else {
            // ... use apiKey ...
            // :hide-start:
            [client deleteAPIKey:[apiKey objectId] completion:^(NSError *error) {
                [expectation fulfill];
            }];
            // :hide-end:
        }
    }];
    // :code-block-end:
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)testLookUpApiKey {
    XCTestExpectation *fetchOneExpectation = [self expectationWithDescription:@"fetch one completes"];
    XCTestExpectation *fetchAllExpectation = [self expectationWithDescription:@"fetch all completes"];
    // :code-block-start: look-up-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];

    // Fetch API key by a specific ObjectId
    NSError *error = nil;
    RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"someObjectId" error:&error];
    [client fetchAPIKey:objectId completion:^(RLMUserAPIKey *apiKey, NSError *error) {
       if (error != nil) {
          // ... handle error ...
       } else {
          // ... use apiKey ...
       }
       // :hide-start:
       [fetchOneExpectation fulfill];
       // :hide-end:
    }];

    // Fetch all API keys
    [client fetchAPIKeysWithCompletion:^(NSArray<RLMUserAPIKey *> *keys, NSError *error) {
       if (error != nil) {
          // ... handle error ...
       } else {
          for (RLMUserAPIKey *key in keys) {
                // ... use key ...
          }
       }
       // :hide-start:
       [fetchAllExpectation fulfill];
       // :hide-end:
    }];
    // :code-block-end:
    [self waitForExpectations:@[fetchOneExpectation, fetchAllExpectation] timeout:10.0];
}

- (void)testEnableDisableApiKey {
    XCTestExpectation *enableExpectation = [self expectationWithDescription:@"enable completes"];
    XCTestExpectation *disableExpectation = [self expectationWithDescription:@"disable completes"];
    // :code-block-start: enable-disable-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];
    
    // Enable the API key with specific objectId
    RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"00112233445566778899aabb" error:nil];
    [client enableAPIKey:objectId completion:^(NSError *error) {
       // Handle error if any. Otherwise, enable was successful.
       // :hide-start:
       [enableExpectation fulfill];
       // :hide-end:
    }];
    
    RLMUserAPIKey *apiKey;

    // ... Get an API key ...
    // :hide-start:
    apiKey = [[RLMUserAPIKey alloc] init];
    // :hide-end:

    // Disable the API key
    [client disableAPIKey:[apiKey objectId] completion:^(NSError *error) {
       // Handle error if any. Otherwise, disable was successful.
       // :hide-start:
       [disableExpectation fulfill];
       // :hide-end:
    }];
    // :code-block-end:
    [self waitForExpectations:@[enableExpectation, disableExpectation] timeout:10.0];
}

- (void)testDeleteApiKey {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :code-block-start: delete-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];
    
    RLMUserAPIKey *apiKey;

    // ... Get an API key ...
    // :hide-start:
    apiKey = [[RLMUserAPIKey alloc] init];
    // :hide-end:

    [client deleteAPIKey:[apiKey objectId] completion:^(NSError *error) {
       // Handle error if any. Otherwise, delete was successful.
       // :hide-start:
       [expectation fulfill];
       // :hide-end:
    }];
    // :code-block-end:
    [self waitForExpectations:@[expectation] timeout:10.0];
}

@end
