#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface ExampleObjcTestCase : XCTestCase

@end

@implementation ExampleObjcTestCase

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    XCTestExpectation *expectation = [self expectationWithDescription:@"..."];

    // Use the app
    RLMApp *app = [MyRealmApp app];
    
    [expectation fulfill];

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
