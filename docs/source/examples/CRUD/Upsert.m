[realm transactionWithBlock:^() {
    Person *drew = [[Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Drew"}];
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    [realm addOrUpdateObject:drew];
    
    Person *andy = [[Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Andy"}];
    // Judging by the ID, it's the same person, just with a different name.
    // This overwrites the original entry (i.e. Drew -> Andy).
    [realm addOrUpdateObject:andy];
}];
