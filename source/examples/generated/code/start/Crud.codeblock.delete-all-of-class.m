RLMRealm *realm = [RLMRealm defaultRealm];

[realm transactionWithBlock:^() {
    // Delete all instances of CrudExampleObjc_Dog from the realm.
    RLMResults<CrudExampleObjc_Dog *> *allCrudExampleObjc_Dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];
    [realm deleteObjects:allCrudExampleObjc_Dogs];
}];