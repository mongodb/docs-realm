// :replace-start: {
//   "terms": {
//     "OpenCloseRealmObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"
#import "AnonymouslyLoggedInTestCase.h"

@interface OpenCloseRealmObjcExamples_Task : RLMObject
@end

@implementation OpenCloseRealmObjcExamples_Task
@end

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
    // :remove-start:
    configuration.objectClasses = @[[OpenCloseRealmObjcExamples_Task class]];
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

- (void)testConfigureObjectTypes {
    // :code-block-start: configure-object-types
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    // :remove-start:
    config.inMemoryIdentifier = @"test";
    // :remove-end:
    
    // Given a RLMObject subclass called `OpenCloseRealmObjcExamples_Task`
    // Limit the realm to only the Task object. All other
    // Object- and EmbeddedObject-derived classes are not added.
    config.objectClasses = @[[OpenCloseRealmObjcExamples_Task class]];
    
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    
    if (error != nil) {
        // Something went wrong
    } else {
        // Use realm
    }
    // :code-block-end:
    (void)realm;
}

@end

// :replace-end:
