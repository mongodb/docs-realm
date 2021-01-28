// :replace-start: {
//   "terms": {
//     "SyncObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"
#import "AnonymouslyLoggedInTestCase.h"

@interface SyncObjcExamples_Task : RLMObject
@property RLMObjectId *_id;
@property NSString *_partition;
@end

@implementation SyncObjcExamples_Task
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[@"_partition"];
}
@end

@interface SyncObjc : AnonymouslyLoggedInTestCase
@end

@implementation SyncObjc
- (void)testOpenSyncedRealm {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :code-block-start: open-synced-realm
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // Log in...
    RLMUser *user = [app currentUser];
    NSString *partitionValue = @"some partition value";

    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];
    // :remove-start:
    configuration.objectClasses = @[SyncObjcExamples_Task.class];
    // :remove-end:
    
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

    // :code-block-start: open-synced-realm-synchronously
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
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testPauseResumeSyncSession {
    // :code-block-start: pause-resume-sync-session
    
    // :code-block-end:
}

- (void)testCheckProgress {
    // :code-block-start: check-progress
    // :code-block-end:
}

- (void)testResetClientRealmFile {
    // :code-block-start: reset-client-realm-file
    // :code-block-end:
}

- (void)testSetClientLogLevel {
    // :code-block-start: set-log-level
    // :code-block-end:
}

@end
