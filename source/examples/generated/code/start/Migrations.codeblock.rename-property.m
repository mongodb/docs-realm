RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
config.schemaVersion = 2;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 2) {
        [migration renamePropertyForClass:[Person className] oldName:@"age" newName:@"yearsSinceBirth"];
    }
};
