RLMRealm *realm = [RLMRealm defaultRealm];
// Open a thread-safe transaction.
[realm transactionWithBlock:^() {
    // Get a dog to update.
    CrudExampleObjc_Dog *dog = [[CrudExampleObjc_Dog allObjectsInRealm: realm] firstObject];

    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.name = @"Wolfie";
    dog.age += 1;
}];