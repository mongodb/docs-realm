#import "AnonymouslyLoggedInTestCase.h"
#import "MyRealmApp.h"

@interface FunctionsObjc : AnonymouslyLoggedInTestCase
@end

@implementation FunctionsObjc
- (void)testCallFunction {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :code-block-start: call-a-function
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
        // :remove-start:
        [expectation fulfill];
        // :remove-end:
    }];

    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
