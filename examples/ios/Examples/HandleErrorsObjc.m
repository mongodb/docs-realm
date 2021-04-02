#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface HandleErrorsObjc : XCTestCase

@end

@implementation HandleErrorsObjc

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

@end
