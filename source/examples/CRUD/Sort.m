RLMResults *projectsSorted = [projects sortedResultsUsingKeyPath:@"name" ascending:NO];

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by dog's owner's name.
RLMResults *dogs = [Dog allObjectsInRealm:realm];
RLMResults *ownersByName = [dogs sortedResultsUsingKeyPath:@"owner.name" ascending:YES];
