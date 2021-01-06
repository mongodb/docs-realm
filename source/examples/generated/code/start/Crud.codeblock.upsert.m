RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^() {
    CrudExampleObjc_Person *jones = [[CrudExampleObjc_Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Jones"}];
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    [realm addOrUpdateObject:jones];
    
    CrudExampleObjc_Person *bowie = [[CrudExampleObjc_Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Bowie"}];
    // Judging by the ID, it's the same person, just with a different name.
    // This overwrites the original entry (i.e. Jones -> Bowie).
    [realm addOrUpdateObject:bowie];
}];