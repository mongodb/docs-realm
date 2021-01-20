RLMRealm *realm = [RLMRealm defaultRealm];

// Establish a relationship
Dog *dog = [[Dog alloc] init];
dog.name = @"Rex";
dog.age = 10;

DogOwner *owner = [[DogOwner alloc] init];
owner.id = 12345;
[owner.dogs addObject:dog];

[realm transactionWithBlock:^() {
    [realm addObject:owner];
}];

// Later, query the specific owner
DogOwner *specificOwner = [DogOwner objectForPrimaryKey:@12345];

// Access directly through a relationship
NSLog(@"# dogs: %lu", [specificOwner.dogs count]);
NSLog(@"First dog's name: %@", specificOwner.dogs[0].name);
