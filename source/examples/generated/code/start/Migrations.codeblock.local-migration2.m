RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
// Set the new schema version
config.schemaVersion = 3;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 2) {
        // Previous Migration.
        [migration enumerateObjects:[Person className]
                            block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                        oldObject[@"firstName"],
                                        oldObject[@"lastName"]];
            newObject[@"age"] = oldObject[@"age"];
        }];
    }
    if (oldSchemaVersion < 3) {
        // New Migration
        [migration enumerateObjects:[Person className]
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
