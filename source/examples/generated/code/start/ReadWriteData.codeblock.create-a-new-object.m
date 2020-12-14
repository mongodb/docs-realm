// (1) Create a Dog object and then set its properties
Example_Dog *myDog = [[Example_Dog alloc] init];
myDog.name = @"Rex";
myDog.age = 10;

// (2) Create a Dog object from a dictionary
Example_Dog *myOtherDog = [[Example_Dog alloc] initWithValue:@{@"name" : @"Pluto", @"age" : @3}];

// (3) Create a Dog object from an array
Example_Dog *myThirdDog = [[Example_Dog alloc] initWithValue:@[@"Pluto", @3]];

// Get the default realm.
// You only need to do this once per thread.
RLMRealm *realm = [RLMRealm defaultRealm];

// Add to the realm with transaction
[realm transactionWithBlock:^() {
    [realm addObject:myDog];
}];