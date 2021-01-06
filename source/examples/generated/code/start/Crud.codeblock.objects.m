RLMRealm *realm = [RLMRealm defaultRealm];

RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];
RLMResults *people = [CrudExampleObjc_Person allObjectsInRealm:realm];