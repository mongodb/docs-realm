RLMRealm *realm = [RLMRealm defaultRealm];

// Establish a relationship
Example_DogOwner *owner = [[Example_DogOwner alloc] init];
owner.id = 12345;

Example_DogClub *club = [[Example_DogClub alloc] init];
club.name = @"Pooch Pals";
[club.members addObject:owner];

[realm transactionWithBlock:^() {
    [realm addObject:club];
}];

// Later, query the specific owner
Example_DogOwner *specificOwner = [Example_DogOwner objectForPrimaryKey:@12345];
    
// Access directly through an inverse relationship
NSLog(@"# memberships: %lu", [specificOwner.clubs count]);
NSLog(@"First club's name: %@", [specificOwner.clubs[0] name]);