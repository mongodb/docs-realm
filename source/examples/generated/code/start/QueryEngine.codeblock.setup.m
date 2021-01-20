RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^() {
    // Add projects and tasks here
}];

RLMResults *tasks = [QueryEngineExamplesObjc_Task allObjectsInRealm:realm];
RLMResults *projects = [QueryEngineExamplesObjc_Project allObjectsInRealm:realm];