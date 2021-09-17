// :replace-start: {
//   "terms": {
//     "MigrationObjcExampleV1_": "",
//     "MigrationObjcExampleV2_": "",
//     "MigrationObjcExampleV3_": "",
//     "MigrationObjcExampleV1Update1_": "",
//     "MigrationObjcExampleV1Update2_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// Note about testing:
// Because we set this up to show multiple schema versions in one file, it is hard to test
// the migrations in here directly. The tests in this file mostly test that the syntax is 
// correct but the functionality was manually verified in a realm app.


// :code-block-start: model-v1
// In the first version of the app, the Person model
// has separate fields for first and last names,
// and an age property.
@interface MigrationObjcExampleV1_Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property int age;
@end

@implementation MigrationObjcExampleV1_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName", @"age"];
}
@end
// :code-block-end:

// :code-block-start: model-v1-update1
// In a new version, you add a property
// on the Person model.
@interface MigrationObjcExampleV1Update1_Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property NSString *email;
@property int age;
@end

@implementation MigrationObjcExampleV1Update1_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName", @"email", @"age"];
}
@end
// :code-block-end:

// :code-block-start: model-v1-update2
// In a new version, you remove a property
// on the Person model.
@interface MigrationObjcExampleV1Update2_Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@end

@implementation MigrationObjcExampleV1Update2_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName"];
}
@end
// :code-block-end:

// :code-block-start: model-v2
// In version 2, the Person model has one
// combined field for the full name and age as a Int. 
// A manual migration will be required to convert from 
// version 1 to this version.
@interface MigrationObjcExampleV2_Person : RLMObject
@property NSString *fullName;
@property int age;
@end

@implementation MigrationObjcExampleV2_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName", @"age"];
}
@end
// :code-block-end:

// :code-block-start: model-v3
// In version 3, the Person model has one
// combined field for the full name and age as a String. 
// A manual migration will be required to convert from 
// version 2 to this version.
@interface MigrationObjcExampleV3_Person : RLMObject
@property NSString *fullName;
@property NSString *age;
@end

@implementation MigrationObjcExampleV3_Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName", @"age"];
}
@end
// :code-block-end:

@interface MigrationsObjc : XCTestCase
@end

@implementation MigrationsObjc
- (void)tearDown {
    [RLMRealmConfiguration setDefaultConfiguration:[[RLMRealmConfiguration alloc] init]];
}

- (void)testRenameProperty {
    // :code-block-start: rename-property
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    // :remove-start:
    // Prevent schema version from affecting other unit tests
    config.inMemoryIdentifier = @"LocalMigrationObjcExample";
    // :remove-end:
    config.schemaVersion = 2;
    config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
        if (oldSchemaVersion < 2) {
            [migration renamePropertyForClass:[MigrationObjcExampleV3_Person className] oldName:@"age" newName:@"yearsSinceBirth"];
        }
    };
    // :code-block-end:
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
        if (oldSchemaVersion < 2) {
            // Iterate over every 'Person' object stored in the Realm file
            [migration enumerateObjects:[MigrationObjcExampleV1_Person className]
                                block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
                // Combine name fields into a single field
                newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                            oldObject[@"firstName"],
                                            oldObject[@"lastName"]];
            }];
        }
    };
    
    // Use this configuration when opening realms
    [RLMRealmConfiguration setDefaultConfiguration:config];
    
    // Now that we've told Realm how to handle the schema change, opening the file
    // will automatically perform the migration
    RLMRealm *realm = [RLMRealm defaultRealm];
    // :code-block-end:
    (void)realm;
}

- (void)testLocalMigration2 {
    // :code-block-start: local-migration2
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    // :remove-start:
    // Prevent schema version from affecting other unit tests
    config.inMemoryIdentifier = @"LocalMigrationObjcExample";
    // :remove-end:
    // Set the new schema version
    config.schemaVersion = 3;
    config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
        if (oldSchemaVersion < 2) {
            // Previous Migration.
            [migration enumerateObjects:[MigrationObjcExampleV1_Person className]
                                block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
                newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                            oldObject[@"firstName"],
                                            oldObject[@"lastName"]];
                newObject[@"age"] = oldObject[@"age"];
            }];
        }
        if (oldSchemaVersion < 3) {
            // New Migration
            [migration enumerateObjects:[MigrationObjcExampleV1_Person className]
                                block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
                // Make age a String instead of an Int
                newObject[@"age"] = [NSString stringWithFormat:@"%d", oldObject[@"age"]];
            }];
        }
    };
    
    // Use this configuration when opening realms
    [RLMRealmConfiguration setDefaultConfiguration:config];
    
    // Now that we've told Realm how to handle the schema change, opening the file
    // will automatically perform the migration
    RLMRealm *realm = [RLMRealm defaultRealm];
    // :code-block-end:
    (void)realm;
}

- (void) testUpdateSchemaVersionSyntax {
    // :code-block-start: update-schema-version
    // When you open the file, specify that the schema
    // is now using a newer version.
    RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
    // :remove-start:
    // Prevent schema version from affecting other unit tests
    config.inMemoryIdentifier = @"LocalMigrationObjcExample";
    // :remove-end:
    // Set the new schema version
    config.schemaVersion = 2;
    // Use this configuration when opening realms
    [RLMRealmConfiguration setDefaultConfiguration:config];
    // :code-block-end:
}

@end

// :replace-end:
