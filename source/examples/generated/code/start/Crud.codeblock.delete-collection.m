RLMRealm *realm = [RLMRealm defaultRealm];

[realm transactionWithBlock:^() {
    // Find dogs younger than 2 years old.
    RLMResults<CrudExampleObjc_Dog *> *puppies = [CrudExampleObjc_Dog objectsInRealm:realm where:@"age < 2"];

    // Delete all objects in the collection from the realm.
    [realm deleteObjects:puppies];
}];