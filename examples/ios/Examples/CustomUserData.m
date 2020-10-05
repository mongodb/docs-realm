#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface CustomUserData : XCTestCase

@end

@implementation CustomUserData

- (void)testCreateCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :code-block-start: create-custom-user-data
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", error);
            return;
        }
        RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
        RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
        RLMMongoCollection *collection = [database collectionWithName:@"users"];
        [collection insertOneDocument:
            @{@"userId": [user identifier], @"favoriteColor": @"pink"}
            completion:^(RLMObjectId *newObjectId, NSError *error) {
                if (error != nil) {
                    NSLog(@"Failed to insert: %@", error);
                    // :hide-start:
                    XCTAssertEqualObjects([error localizedDescription], @"no rule exists for namespace 'my_database.users'");
                    [expectation fulfill];
                    // :hide-end:
                }
                NSLog(@"Inserted custom user data document with object ID: %@", newObjectId);
        }];
    }];
    // :code-block-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testReadCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :code-block-start: read-custom-user-data
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", error);
            return;
        }
        
        // If the user data has been refreshed recently, you can access the
        // custom user data directly on the user object
        NSLog(@"User custom data: %@", [user customData]);
        
        // Refresh the custom data
        [user refreshCustomDataWithCompletion:^(NSDictionary *customData, NSError *error) {
            if (error != nil) {
                NSLog(@"Failed to refresh custom user data: %@", error);
                return;
            }
            NSLog(@"Favorite color: %@", customData[@"favoriteColor"]);
            // :hide-start:
            [expectation fulfill];
            // :hide-end:
        }];
    }];
    // :code-block-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testUpdateCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :code-block-start: update-custom-user-data
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", error);
            return;
        }
        RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
        RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
        RLMMongoCollection *collection = [database collectionWithName:@"users"];

        // Update the user's custom data document
        [collection updateOneDocumentWhere:@{@"userId": [user identifier]}
            updateDocument: @{@"favoriteColor": @"cerulean"}
            completion:^(RLMUpdateResult *updateResult, NSError *error) { 
                if (error != nil) {
                    NSLog(@"Failed to insert: %@", error);
                    // :hide-start:
                    XCTAssertEqualObjects([error localizedDescription], @"no rule exists for namespace 'my_database.users'");
                    [expectation fulfill];
                    // :hide-end:
                }
                NSLog(@"Matched: %lu, modified: %lu", [updateResult matchedCount], [updateResult modifiedCount]); 
        }];
    }];
    // :code-block-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
