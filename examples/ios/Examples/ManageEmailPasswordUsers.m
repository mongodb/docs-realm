#import <XCTest/XCTest.h>
#import "MyRealmApp.h"

@interface ManageEmailPasswordUsers : XCTestCase

@end

@implementation ManageEmailPasswordUsers

- (void)testRegisterNewAccount {
    XCTestExpectation *expectation = [self expectationWithDescription:@"register completes"];

    // :code-block-start: register-email-objc
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    RLMEmailPasswordAuth *client = [app emailPasswordAuth];
    NSString *email = @"skroob2@example.com";
    NSString *password = @"password12345";
    [client registerUserWithEmail:email password:password completion:^(NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to register: %@", [error localizedDescription]);
            // :hide-start:
            XCTAssert(false, @"Failed to register: %@", [error localizedDescription]);
            // :hide-end:
            return;
        }
        // Registering just registers. You can now log in.
        NSLog(@"Successfully registered user.");
        // :hide-start:
        [expectation fulfill];
        // :hide-end:   
    }];
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testConfirmNewUserEmail {
    XCTestExpectation *expectation = [self expectationWithDescription:@"confirmation completes"];

    // :code-block-start: confirm-new-user-email-objc
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    RLMEmailPasswordAuth *client = [app emailPasswordAuth];

    // Token and tokenId are query parameters in the confirmation
    // link sent in the confirmation email.
    NSString *token = @"someToken";
    NSString *tokenId = @"someTokenId";

    [client confirmUser:token tokenId:tokenId completion:^(NSError *error) {
       if (error != nil) {
           NSLog(@"User confirmation failed: %@", [error localizedDescription]);
           // :hide-start:
           XCTAssertEqualObjects([error localizedDescription], @"invalid token data");
           [expectation fulfill];
           // :hide-end:
           return;
       }
       // User confirmed
       NSLog(@"Successfully confirmed user.");
    }];
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testResetPassword {
    XCTestExpectation *expectation = [self expectationWithDescription:@"send reset email completes"];

    // :code-block-start: reset-password-objc
    RLMApp *app = [RLMApp appWithId:YOUR_REALM_APP_ID];
    RLMEmailPasswordAuth *client = [app emailPasswordAuth];

    // If Realm app password reset mode is "Send a password reset email",
    // we can do so here:
    NSString *email = @"forgot.my.password@example.com";
    [client sendResetPasswordEmail:email completion:^(NSError *error) {
       if (error != nil) {
           NSLog(@"Failed to send reset password email: %@", [error localizedDescription]);
           // :hide-start:
           XCTAssertEqualObjects([error localizedDescription], @"user not found");
           [expectation fulfill];
           // :hide-end:
           return;
       }
       // Email sent.
       NSLog(@"Successfully sent reset password email.");
    }];
    // :hide-start:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
    expectation = [self expectationWithDescription:@"reset password completes"];
    // :hide-end:
    
    // Later...
    
    NSString *newPassword = @"mynewpassword12345";

    // Token and tokenId are query parameters in the confirmation
    // link sent in the reset password email.
    NSString *token = @"someToken";
    NSString *tokenId = @"someTokenId";

    [client resetPasswordTo:newPassword token:token tokenId:tokenId completion:^(NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to reset password: %@", [error localizedDescription]);
            // :hide-start:
            XCTAssertEqualObjects([error localizedDescription], @"invalid token data");
            [expectation fulfill];
            // :hide-end:
            return;
        }
        // Password reset.
        NSLog(@"Successfully reset password.");
    }];
    
    // :code-block-end:
    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}


@end
