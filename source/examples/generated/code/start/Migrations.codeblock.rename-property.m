RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
config.schemaVersion = 1;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 1) {
        [migration renamePropertyForClass:[Person className] oldName:@"yearsSinceBirth" newName:@"age"];
    }
};
