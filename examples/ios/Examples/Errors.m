#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface Errors : XCTestCase

@end

@implementation Errors

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}


- (void)testErrorHandlerMethod {
    // :code-block-start: create-error-handler
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    // Access the sync manager for the app
    RLMSyncManager *syncManager = [app syncManager];

    syncManager.errorHandler = ^(NSError *error, RLMSyncSession *session) {
        // handle error
    };
    // :code-block-end:
}

- (void)testClientReset {
    // :code-block-start: client-reset
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    [[app syncManager] setErrorHandler:^(NSError *error, RLMSyncSession *session) {
        if (error.code == RLMSyncErrorClientResetError) {
            // TODO: Invalidate all open realm instances
            // TODO: Restore the local changes backed up at [error rlmSync_clientResetBackedUpRealmPath]
            [RLMSyncSession immediatelyHandleError:[error rlmSync_errorActionToken] syncManager:[app syncManager]];
            return;
        }
        // Handle other errors...
    }];
    // :code-block-end:
}

@end
