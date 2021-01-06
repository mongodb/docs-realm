RLMRealm *realm = [RLMRealm defaultRealm];

// Access all dogs in the realm
RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];

// Filter by age
RLMResults *puppies = [dogs objectsWhere:@"age < 2"];

// Filter by owner
RLMResults *availableDogs = [dogs objectsWhere:@"owner == nil"];

// Filter by owner's name
RLMResults *ownedByKeith = [dogs objectsWhere:@"owner.name == %@", @"Keith"];