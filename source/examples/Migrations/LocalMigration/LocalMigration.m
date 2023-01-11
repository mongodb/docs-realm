// In [AppDelegate didFinishLaunchingWithOptions:]
RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
config.schemaVersion = 2;
config.migrationBlock = ^(RLMMigration *migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 1) {
        // The enumerateObjects:block: method iterates over every
        // 'Person' object stored in the Realm file
        [migration enumerateObjects:Person.className
                              block:^(RLMObject *oldObject, RLMObject *newObject) {

        // combine name fields into a single field
        newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                      oldObject[@"firstName"],
                                      oldObject[@"lastName"]];
        }];
    }
};
[RLMRealmConfiguration setDefaultConfiguration:config];
