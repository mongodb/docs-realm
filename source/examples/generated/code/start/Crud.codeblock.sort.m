RLMRealm *realm = [RLMRealm defaultRealm];

RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];

// Sort dogs by name
RLMResults *dogsSorted = [dogs sortedResultsUsingKeyPath:@"name" ascending:NO];

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by dog's owner's name.
RLMResults *ownersByName = [dogs sortedResultsUsingKeyPath:@"owner.name" ascending:YES];