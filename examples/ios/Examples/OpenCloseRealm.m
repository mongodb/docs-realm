// :replace-start: {
//   "terms": {
//     "OpenCloseRealmObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

@interface OpenCloseRealmObjcExamples_Task : RLMObject
@end

@implementation OpenCloseRealmObjcExamples_Task
@end

@interface OpenCloseRealmObjc : XCTestCase
@end

@implementation OpenCloseRealmObjc
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

- (void)testOpenInMemoryRealm {
    // :code-block-start: open-in-memory-realm
    // Open the realm with a specific in-memory identifier.
    NSString *identifier = @"MyRealm";
    RLMRealmConfiguration *configuration = [[RLMRealmConfiguration alloc] init];
    configuration.inMemoryIdentifier = identifier;
    // Open the realm
    RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration error:nil];
    // :code-block-end:
    (void)realm;
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

- (void)testHandleError {
    // :code-block-start: handle-error
    NSError *error = nil;
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
    if (!realm) {
        // Handle error
        return;
    }
    // Use realm
    // :code-block-end:
}

@end

// :replace-end:
