// Get an immutable copy of the realm that can be passed across threads
RLMRealm *frozenRealm = [realm freeze];

RLMResults *dogs = [Dog allObjectsInRealm:realm];

// You can freeze collections
RLMResults *frozenDogs = [dogs freeze];

// You can still read from frozen realms
RLMResults *frozenDogs2 = [Dog allObjectsInRealm:frozenRealm];

Dog *dog = [dogs firstObject];

// You can freeze objects
Dog *frozenDog = [dog freeze];
