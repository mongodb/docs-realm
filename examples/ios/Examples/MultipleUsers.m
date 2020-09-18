//
//  MultipleUsers.m
//  RealmExamples
//
//  Created by Chris Bush on 2020-09-18.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "MyRealmApp.h"

// :code-block-start: link-identity-objc
@interface LinkIdentitiesExample : NSObject
@end

@implementation LinkIdentitiesExample {
    RLMApp *app;
    RLMUser *anonymousUser;
    // :hide-start:
    XCTestExpectation *expectation;
    // :hide-end:
}
// :hide-start:
- (instancetype)initWithExpectation:(XCTestExpectation *)expectation {
    self = [super init];
    if (self) {
        self->expectation = expectation;
    }
    return self;
}
// :hide-end:

// Entry-point for example.
- (void)runExample {
    app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    [self logInAnonymously];
}

- (void)logInAnonymously {
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", [error localizedDescription]);
            return;
        }

        // User uses app, then later registers an account
        [self registerNewAccountAsAnonymousUser: user];
    }];
}

- (void)registerNewAccountAsAnonymousUser:(RLMUser *)user {    
    NSString *email = @"link2@example.com";
    NSString *password = @"ganondorf";
    [[app emailPasswordAuth] registerUserWithEmail:email password:password completion:^(NSError *error) { 
            if (error != nil) {
                NSLog(@"Failed to register new account: %@", [error localizedDescription]);
                return;
            }

            // Successfully created account, now link it
            // with the existing anon user
            [self linkUser:self->anonymousUser withCredentials:[RLMCredentials credentialsWithEmail:email password:password]];     
    }];
}

- (void)linkUser:(RLMUser *)user withCredentials:(RLMCredentials *)credentials {
    [[app currentUser] linkUserWithCredentials:credentials completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to link user: %@", [error localizedDescription]);
            return;
        }

        NSLog(@"Successfully linked user: %@", user);
        
        // :hide-start:
        [self->expectation fulfill];
        // :hide-end:
    }];
}

@end 
// :code-block-end:

@interface MultipleUsers : XCTestCase

@end

@implementation MultipleUsers

- (void)tearDown {
    XCTestExpectation *expectation = [self expectationWithDescription:@"Remove anonymous user from device"];
    [[[MyRealmApp app] currentUser] removeWithCompletion:^(NSError *error) {
        [expectation fulfill];
    }];
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)testLinkIdentities {
    XCTestExpectation *expectation = [self expectationWithDescription:@"Link user completes"];
    [[[LinkIdentitiesExample alloc] initWithExpectation:expectation] runExample];
    [self waitForExpectations:@[expectation] timeout:10.0];
}

@end
