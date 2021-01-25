// :replace-start: {
//   "terms": {
//     "ReadWriteDataObjcExample_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: models
// DogToy.h
@interface ReadWriteDataObjcExample_DogToy : RLMObject
@property NSString *name;
@end

// Dog.h
@interface ReadWriteDataObjcExample_Dog : RLMObject
@property NSString *name;
@property int age;

// To-one relationship
@property ReadWriteDataObjcExample_DogToy *favoriteToy;

@end

// Enable ReadWriteDataObjcExample_Dog for use in RLMArray
RLM_ARRAY_TYPE(ReadWriteDataObjcExample_Dog)


// Person.h
// A person has a primary key ID, a collection of dogs, and can be a member of multiple clubs.
@interface ReadWriteDataObjcExample_Person : RLMObject
@property int _id;

// To-many relationship - a person can have many dogs
@property RLMArray<ReadWriteDataObjcExample_Dog *><ReadWriteDataObjcExample_Dog> *dogs;

// Inverse relationship - a person can be a member of many clubs
@property (readonly) RLMLinkingObjects *clubs;
@end

RLM_ARRAY_TYPE(ReadWriteDataObjcExample_Person)


// DogClub.h
@interface ReadWriteDataObjcExample_DogClub : RLMObject
@property NSString *name;
@property RLMArray<ReadWriteDataObjcExample_Person *><ReadWriteDataObjcExample_Person> *members;
@end


// Dog.m
@implementation ReadWriteDataObjcExample_Dog
@end


// DogToy.m
@implementation ReadWriteDataObjcExample_DogToy
@end


// Person.m
@implementation ReadWriteDataObjcExample_Person
// Define the primary key for the class
+ (NSString *)primaryKey {
    return @"_id";
}

// Define the inverse relationship to dog clubs
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"clubs": [RLMPropertyDescriptor descriptorWithClass:ReadWriteDataObjcExample_DogClub.class propertyName:@"members"],
    };
}
@end


// DogClub.m
@implementation ReadWriteDataObjcExample_DogClub
@end
// :code-block-end:


@interface ReadWriteDataObjc : XCTestCase

@end

@implementation ReadWriteDataObjc

- (void)tearDown {
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^() {
        [realm deleteAllObjects];
    }];
}

- (void)testCreateNewObject {
    // :code-block-start: create-a-new-object
    // (1) Create a Dog object and then set its properties
    ReadWriteDataObjcExample_Dog *myDog = [[ReadWriteDataObjcExample_Dog alloc] init];
    myDog.name = @"Rex";
    myDog.age = 10;

    // (2) Create a Dog object from a dictionary
    ReadWriteDataObjcExample_Dog *myOtherDog = [[ReadWriteDataObjcExample_Dog alloc] initWithValue:@{@"name" : @"Pluto", @"age" : @3}];

    // (3) Create a Dog object from an array
    ReadWriteDataObjcExample_Dog *myThirdDog = [[ReadWriteDataObjcExample_Dog alloc] initWithValue:@[@"Pluto", @3]];

    // Get the default realm.
    // You only need to do this once per thread.
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Add to the realm with transaction
    [realm transactionWithBlock:^() {
        [realm addObject:myDog];
    }];
    // :code-block-end:
}

- (void)testFindObjectByPrimaryKey {
    // :code-block-start: find-a-specific-object-by-primary-key
    // Get a specific person from the default realm
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
    // :code-block-end:
}

- (void)testQueryRelationship {
    // :code-block-start: query-a-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
    dog.name = @"Rex";
    dog.age = 10;
    
    ReadWriteDataObjcExample_Person *person = [[ReadWriteDataObjcExample_Person alloc] init];
    person._id = 12345;
    [person.dogs addObject:dog];
    
    [realm transactionWithBlock:^() {
        [realm addObject:person];
    }];
    
    // Later, query the specific person
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
    
    // Access directly through a relationship
    NSLog(@"# dogs: %lu", [specificPerson.dogs count]);
    NSLog(@"First dog's name: %@", specificPerson.dogs[0].name);
    // :code-block-end:
}

- (void)testQueryInverseRelationship {
    // :code-block-start: query-an-inverse-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_Person *person = [[ReadWriteDataObjcExample_Person alloc] init];
    person._id = 12345;
    
    ReadWriteDataObjcExample_DogClub *club = [[ReadWriteDataObjcExample_DogClub alloc] init];
    club.name = @"Pooch Pals";
    [club.members addObject:person];
    
    [realm transactionWithBlock:^() {
        [realm addObject:club];
    }];
    
    // Later, query the specific person
    ReadWriteDataObjcExample_Person *specificPerson = [ReadWriteDataObjcExample_Person objectForPrimaryKey:@12345];
        
    // Access directly through an inverse relationship
    NSLog(@"# memberships: %lu", [specificPerson.clubs count]);
    NSLog(@"First club's name: %@", [specificPerson.clubs[0] name]);
    // :code-block-end:
}

- (void)testBatchUpdateAndCascadingDelete {
    // :code-block-start: batch-update
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Create a person to take care of some dogs.
        ReadWriteDataObjcExample_Person *ali = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1, @"name": @"Ali"}];
        [realm addObject:ali];

        // Find dogs younger than 2.
        RLMResults<ReadWriteDataObjcExample_Dog *> *puppies = [ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"age < 2"];

        // Batch update: give all puppies to Ali.
        [ali setValue:puppies forKey:@"dogs"];
    }];
    // :code-block-end:

    ReadWriteDataObjcExample_Person *ali = [ReadWriteDataObjcExample_Person objectInRealm:realm forPrimaryKey:@1];
    // :code-block-start: cascading-delete
    [realm transactionWithBlock:^() {
        // Delete Ali's dogs.
        [realm deleteObjects:[ali dogs]];
        // Delete Ali.
        [realm deleteObject:ali];
    }];
    // :code-block-end:
}

- (void)testCreateAndDelete {
    // :code-block-start: create
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Instantiate the class.
    ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
    dog.name = @"Max";
    dog.age = 5;

    // Open a thread-safe transaction.
    [realm transactionWithBlock:^() {
        // Add the instance to the realm.
        [realm addObject:dog];
    }];
    // :code-block-end:

    // :code-block-start: delete
    [realm transactionWithBlock:^() {
        // Delete the instance from the realm.
        [realm deleteObject:dog];
    }];
    // :code-block-end:
}

- (void)testDeleteAll {
    // :code-block-start: delete-all
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Delete all objects from the realm.
        [realm deleteAllObjects];
    }];
    // :code-block-end:
}

- (void)testDeleteAllOfClass {
    // :code-block-start: delete-all-of-class
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Delete all instances of ReadWriteDataObjcExample_Dog from the realm.
        RLMResults<ReadWriteDataObjcExample_Dog *> *allReadWriteDataObjcExample_Dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];
        [realm deleteObjects:allReadWriteDataObjcExample_Dogs];
    }];
    // :code-block-end:
}

- (void)testDeleteCollection {
    // :code-block-start: delete-collection
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Find dogs younger than 2 years old.
        RLMResults<ReadWriteDataObjcExample_Dog *> *puppies = [ReadWriteDataObjcExample_Dog objectsInRealm:realm where:@"age < 2"];

        // Delete all objects in the collection from the realm.
        [realm deleteObjects:puppies];
    }];
    // :code-block-end:
}

- (void)testObjects {
    // :code-block-start: objects
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];
    RLMResults *people = [ReadWriteDataObjcExample_Person allObjectsInRealm:realm];
    // :code-block-end:
    (void)dogs;
    (void)people;
}

- (void)testSort {
    // :code-block-start: sort
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];

    // Sort dogs by name
    RLMResults *dogsSorted = [dogs sortedResultsUsingKeyPath:@"name" ascending:NO];

    // You can also sort on the members of linked objects. In this example,
    // we sort the dogs by their favorite toys' names.
    RLMResults *dogsSortedByFavoriteToyName = [dogs sortedResultsUsingKeyPath:@"favoriteToy.name" ascending:YES];
    // :code-block-end:
    (void)dogsSorted;
    (void)dogsSortedByFavoriteToyName;
}

- (void)testFilter {
    // :code-block-start: filter
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Access all dogs in the realm
    RLMResults *dogs = [ReadWriteDataObjcExample_Dog allObjectsInRealm:realm];

    // Filter by age
    RLMResults *puppies = [dogs objectsWhere:@"age < 2"];
    
    // Filter by favorite toy
    RLMResults *dogsWithoutFavoriteToy = [dogs objectsWhere:@"favoriteToy == nil"];
    
    // Filter by favorite toy's name
    RLMResults *dogsWhoLikeTennisBalls = [dogs objectsWhere:@"favoriteToy.name == %@", @"Tennis ball"];
    // :code-block-end:
    (void)puppies;
    (void)dogsWithoutFavoriteToy;
    (void)dogsWhoLikeTennisBalls;
}

- (void)testTransaction {
    // :code-block-start: transaction
    // Open the default realm.
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Open a thread-safe transaction.
    [realm transactionWithBlock:^() {
        // ... Make changes ...
        // Realm automatically cancels the transaction in case of exception.
        // Otherwise, Realm automatically commits the transaction at the
        // end of the code block.
    }];
    // :code-block-end:
}

- (void)testTransactionCounterexample {
    // :code-block-start: transaction-counterexample
    RLMRealm *realm = [RLMRealm defaultRealm];

    // BAD EXAMPLE -- avoid this!
    [realm beginWriteTransaction];
    // ... Make changes ...
    // If an exception is thrown here or the function otherwise returns early,
    // the transaction remains open!
    [realm commitWriteTransaction];
    // :code-block-end:
}

- (void)testUpdate {
    // :code-block-start: update
    RLMRealm *realm = [RLMRealm defaultRealm];
    // Open a thread-safe transaction.
    [realm transactionWithBlock:^{
        // Get a dog to update.
        ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog allObjectsInRealm: realm] firstObject];

        // Update some properties on the instance.
        // These changes are saved to the realm.
        dog.name = @"Wolfie";
        dog.age += 1;
    }];
    // :code-block-end:

}

- (void)testUpsert {
    // :code-block-start: upsert
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        ReadWriteDataObjcExample_Person *jones = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Jones"}];
        // Add a new person to the realm. Since nobody with ID 1234
        // has been added yet, this adds the instance to the realm.
        [realm addOrUpdateObject:jones];
        
        ReadWriteDataObjcExample_Person *bowie = [[ReadWriteDataObjcExample_Person alloc] initWithValue:@{@"_id": @1234, @"name": @"Bowie"}];
        // Judging by the ID, it's the same person, just with a different name.
        // This overwrites the original entry (i.e. Jones -> Bowie).
        [realm addOrUpdateObject:bowie];
    }];
    // :code-block-end:
}

- (void)testAggregate {
    // :code-block-start: aggregate
    RLMRealm *realm = [RLMRealm defaultRealm];

    RLMResults *people = [ReadWriteDataObjcExample_Person allObjectsInRealm:realm];

    // People whose dogs' average age is 5
    [people objectsWhere:@"dogs.@avg.age == 5"];

    // People with older dogs
    [people objectsWhere:@"dogs.@min.age > 5"];

    // People with younger dogs
    [people objectsWhere:@"dogs.@max.age < 2"];

    // People with many dogs
    [people objectsWhere:@"dogs.@count > 2"];

    // People whose dogs' ages combined > 10 years
    [people objectsWhere:@"dogs.@sum.age > 10"];
    // :code-block-end:
}

@end

// :replace-end:
