RLMRealm *realm = [RLMRealm defaultRealm];

// Establish a relationship
Example_Dog *dog = [[Example_Dog alloc] init];
dog.name = @"Rex";
dog.age = 10;

Example_DogOwner *owner = [[Example_DogOwner alloc] init];
owner.id = 12345;
[owner.dogs addObject:dog];

[realm transactionWithBlock:^() {
    [realm addObject:owner];
}];

// Later, query the specific owner
Example_DogOwner *specificOwner = [Example_DogOwner objectForPrimaryKey:@12345];

// Access directly through a relationship
NSLog(@"# dogs: %lu", [specificOwner.dogs count]);
NSLog(@"First dog's name: %@", specificOwner.dogs[0].name);