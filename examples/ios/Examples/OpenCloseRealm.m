#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"
#import "AnonymouslyLoggedInTestCase.h"

@interface OpenCloseRealmObjc : AnonymouslyLoggedInTestCase

@end

@implementation OpenCloseRealmObjc

- (void)testOpenSyncedRealm {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :code-block-start: open-synced-realm
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
            // :hide-start:
            [expectation fulfill];
            // :hide-end:
            return;
        }

        NSLog(@"Successfully opened realm");
        // Use realm
    }];
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testOpenSyncedRealmSync {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :code-block-start: open-synced-realm-synchronously
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // Log in...
    RLMUser *user = [app currentUser];
    NSString *partitionValue = @"some partition value";
    
    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];
    
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration
                                                 error:&error];
    
    if (error != nil) {
        NSLog(@"Failed to open realm: %@", [error localizedDescription]);
        // :hide-start:
        [expectation fulfill];
        // :hide-end:
    } else {
        NSLog(@"Opened realm: %@", realm);
        // Use realm
    }
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testOpenLocalRealm {
    // :code-block-start: open-local-realm
    // Open the default realm
    RLMRealm *defaultRealm = [RLMRealm defaultRealm];

    // Open the realm with a specific file URL, for example a username
    NSString *username = @"GordonCole";
    RLMRealmConfiguration *configuration = [RLMRealmConfiguration defaultConfiguration];
    configuration.fileURL = [[[configuration.fileURL URLByDeletingLastPathComponent]
                             URLByAppendingPathComponent:username]
                             URLByAppendingPathExtension:@"realm"];
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration
                                                 error:&error];
    // :code-block-end:
    (void)realm;
    (void)defaultRealm;
    
}
@end
