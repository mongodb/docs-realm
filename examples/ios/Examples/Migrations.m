// :replace-start: {
//   "terms": {
//     "MigrationObjcExampleV1_": "",
//     "MigrationObjcExampleV2_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: model-v1
// In the first version of the app, the Person model
// has separate fields for first and last names.
@interface MigrationObjcExampleV1_Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property int age;
@end

@implementation MigrationObjcExampleV1_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName"];
}
@end
// :code-block-end:

// :code-block-start: model-v2
// In the second version, the Person model has one
// combined field for the name. A migration will be required
// to convert from version 1 to version 2.
@interface MigrationObjcExampleV2_Person : RLMObject
@property NSString *fullName;
@property int age;
@end

@implementation MigrationObjcExampleV2_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName"];
}
@end
// :code-block-end:

@interface MigrationsObjc : XCTestCase
@end

@implementation MigrationsObjc
- (void)tearDown {
    [RLMRealmConfiguration setDefaultConfiguration:[[RLMRealmConfiguration alloc] init]];
}

- (void)testLocalMigration {
    // :code-block-start: local-migration
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    // :remove-start:
    // Prevent schema version from affecting other unit tests
    config.inMemoryIdentifier = @"LocalMigrationObjcExample";
    // :remove-end:
    // Set the new schema version
    config.schemaVersion = 2;
    config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
        if (oldSchemaVersion >= 2) {
            return;
        }
        // Iterate over every 'Person' object stored in the Realm file
        [migration enumerateObjects:[MigrationObjcExampleV2_Person className]
                              block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            // Combine name fields into a single field
            newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                          oldObject[@"firstName"],
                                          oldObject[@"lastName"]];
        }];
    };
    
    // Use this configuration when opening realms
    [RLMRealmConfiguration setDefaultConfiguration:config];
    
    // Now that we've told Realm how to handle the schema change, opening the file
    // will automatically perform the migration
    RLMRealm *realm = [RLMRealm defaultRealm];
    // :code-block-end:
    (void)realm;
}
@end

// :replace-end:
