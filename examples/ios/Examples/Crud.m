// :replace-start: {
//   "terms": {
//     "CrudExampleObjc_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: models
// CrudExampleObjc_Person.h
@interface CrudExampleObjc_Person : RLMObject
@property NSNumber<RLMInt> *_id;
@property NSString *name;
@property (readonly) RLMLinkingObjects *dogs;
@end

// CrudExampleObjc_Dog.h
@interface CrudExampleObjc_Dog : RLMObject
@property NSString *name;
@property NSString *breed;
@property int age;
@property CrudExampleObjc_Person *owner;
@end

// CrudExampleObjc_Dog.m
@implementation CrudExampleObjc_Dog
@end

// CrudExampleObjc_Person.m
@implementation CrudExampleObjc_Person
+ (NSString *)primaryKey {
    return @"_id";
}
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"dogs": [RLMPropertyDescriptor descriptorWithClass:CrudExampleObjc_Dog.class propertyName:@"owner"],
    };
}
@end
// :code-block-end:

@interface CrudObjc : XCTestCase

@end

@implementation CrudObjc

- (void)testBatchUpdateAndCascadingDelete {
    // :code-block-start: batch-update
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Create a person to take care of some dogs.
        CrudExampleObjc_Person *ali = [[CrudExampleObjc_Person alloc] initWithValue:@{@"_id": @1, @"name": @"Ali"}];
        [realm addObject:ali];

        // Find dogs younger than 2.
        RLMResults<CrudExampleObjc_Dog *> *puppies = [CrudExampleObjc_Dog objectsInRealm:realm where:@"age < 2"];

        // Batch update: give all puppies to Ali.
        [puppies setValue:ali forKey:@"owner"];
    }];
    // :code-block-end:

    CrudExampleObjc_Person *ali = [CrudExampleObjc_Person objectInRealm:realm forPrimaryKey:@1];
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
    CrudExampleObjc_Dog *dog = [[CrudExampleObjc_Dog alloc] init];
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
        // Delete all instances of CrudExampleObjc_Dog from the realm.
        RLMResults<CrudExampleObjc_Dog *> *allCrudExampleObjc_Dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];
        [realm deleteObjects:allCrudExampleObjc_Dogs];
    }];
    // :code-block-end:
}

- (void)testDeleteCollection {
    // :code-block-start: delete-collection
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^() {
        // Find dogs younger than 2 years old.
        RLMResults<CrudExampleObjc_Dog *> *puppies = [CrudExampleObjc_Dog objectsInRealm:realm where:@"age < 2"];

        // Delete all objects in the collection from the realm.
        [realm deleteObjects:puppies];
    }];
    // :code-block-end:
}

- (void)testObjects {
    // :code-block-start: objects
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];
    RLMResults *people = [CrudExampleObjc_Person allObjectsInRealm:realm];
    // :code-block-end:
    (void)dogs;
    (void)people;
}

- (void)testSort {
    // :code-block-start: sort
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];

    // Sort dogs by name
    RLMResults *dogsSorted = [dogs sortedResultsUsingKeyPath:@"name" ascending:NO];

    // You can also sort on the members of linked objects. In this example,
    // we sort the dogs by dog's owner's name.
    RLMResults *ownersByName = [dogs sortedResultsUsingKeyPath:@"owner.name" ascending:YES];
    // :code-block-end:
    (void)dogsSorted;
    (void)ownersByName;
}

- (void)testFilter {
    // :code-block-start: filter
    RLMRealm *realm = [RLMRealm defaultRealm];

    // Access all dogs in the realm
    RLMResults *dogs = [CrudExampleObjc_Dog allObjectsInRealm:realm];

    // Filter by age
    RLMResults *puppies = [dogs objectsWhere:@"age < 2"];
    
    // Filter by owner
    RLMResults *availableDogs = [dogs objectsWhere:@"owner == nil"];
    
    // Filter by owner's name
    RLMResults *ownedByKeith = [dogs objectsWhere:@"owner.name == %@", @"Keith"];
    // :code-block-end:
    (void)puppies;
    (void)availableDogs;
    (void)ownedByKeith;
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
    [realm transactionWithBlock:^() {
        // Get a dog to update.
        CrudExampleObjc_Dog *dog = [[CrudExampleObjc_Dog allObjectsInRealm: realm] firstObject];

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
    [realm transactionWithBlock:^() {
        CrudExampleObjc_Person *jones = [[CrudExampleObjc_Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Jones"}];
        // Add a new person to the realm. Since nobody with ID 1234
        // has been added yet, this adds the instance to the realm.
        [realm addOrUpdateObject:jones];
        
        CrudExampleObjc_Person *bowie = [[CrudExampleObjc_Person alloc] initWithValue:@{@"ID": @1234, @"name": @"Bowie"}];
        // Judging by the ID, it's the same person, just with a different name.
        // This overwrites the original entry (i.e. Jones -> Bowie).
        [realm addOrUpdateObject:bowie];
    }];
    // :code-block-end:
}

@end

// :replace-end:
