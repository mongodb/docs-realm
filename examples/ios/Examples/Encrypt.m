#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import <Foundation/Foundation.h>

@interface EncryptObjc : XCTestCase

@end

@implementation EncryptObjc

- (void)testEncrypt {
    // :code-block-start: encrypt
    // Generate a random encryption key
    NSMutableData *key = [NSMutableData dataWithLength:64];
    (void)SecRandomCopyBytes(kSecRandomDefault, key.length, (uint8_t *)key.mutableBytes);

    // Open the encrypted Realm file
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    config.encryptionKey = key;
    
    // :hide-start:
    // This is not required for the example, but is required for the test.
    // Omit from the example.
    config.inMemoryIdentifier = @"myEncryptedInMemoryRealm";
    // :hide-end:
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    if (!realm) {
        // If the encryption key is wrong, `error` will say that it's an invalid database
        NSLog(@"Error opening realm: %@", error);
    } else {
        // Use the realm as normal...
    }
    // :code-block-end:
}

@end

