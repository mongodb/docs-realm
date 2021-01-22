// :replace-start: {
//   "terms": {
//     "ReadWriteDataObjcExample_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :code-block-start: models
@interface ReadWriteDataObjcExample_Dog : RLMObject
@property NSString *name;
@property NSInteger age;
@end

// Enable ReadWriteDataObjcExample_Dog for use in RLMArray
RLM_ARRAY_TYPE(ReadWriteDataObjcExample_Dog)

// A dog owner has a primary key ID, a collection of dogs, and can be a member of multiple clubs.
@interface ReadWriteDataObjcExample_DogOwner : RLMObject
@property NSInteger id;

// To-many relationship - a dog owner can have many dogs
@property RLMArray<ReadWriteDataObjcExample_Dog *><ReadWriteDataObjcExample_Dog> *dogs;

// Inverse relationship - an owner can be a member of many clubs
@property (readonly) RLMLinkingObjects *clubs;
@end

RLM_ARRAY_TYPE(ReadWriteDataObjcExample_DogOwner)

@interface ReadWriteDataObjcExample_DogClub : RLMObject
@property NSString *name;
@property RLMArray<ReadWriteDataObjcExample_DogOwner *><ReadWriteDataObjcExample_DogOwner> *members;
@end

@implementation ReadWriteDataObjcExample_Dog
@end

@implementation ReadWriteDataObjcExample_DogOwner
// Define the primary key for the class
+ (NSString *)primaryKey {
    return @"id";
}

// Define the inverse relationship to dog clubs
+ (NSDictionary *)linkingObjectsProperties {
    return @{
        @"clubs": [RLMPropertyDescriptor descriptorWithClass:ReadWriteDataObjcExample_DogClub.class propertyName:@"members"],
    };
}
@end

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
    // Get a specific owner from the default realm
    ReadWriteDataObjcExample_DogOwner *specificOwner = [ReadWriteDataObjcExample_DogOwner objectForPrimaryKey:@12345];
    // :code-block-end:
}

- (void)testQueryRelationship {
    // :code-block-start: query-a-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_Dog *dog = [[ReadWriteDataObjcExample_Dog alloc] init];
    dog.name = @"Rex";
    dog.age = 10;
    
    ReadWriteDataObjcExample_DogOwner *owner = [[ReadWriteDataObjcExample_DogOwner alloc] init];
    owner.id = 12345;
    [owner.dogs addObject:dog];
    
    [realm transactionWithBlock:^() {
        [realm addObject:owner];
    }];
    
    // Later, query the specific owner
    ReadWriteDataObjcExample_DogOwner *specificOwner = [ReadWriteDataObjcExample_DogOwner objectForPrimaryKey:@12345];
    
    // Access directly through a relationship
    NSLog(@"# dogs: %lu", [specificOwner.dogs count]);
    NSLog(@"First dog's name: %@", specificOwner.dogs[0].name);
    // :code-block-end:
}

- (void)testQueryInverseRelationship {
    // :code-block-start: query-an-inverse-relationship
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Establish a relationship
    ReadWriteDataObjcExample_DogOwner *owner = [[ReadWriteDataObjcExample_DogOwner alloc] init];
    owner.id = 12345;
    
    ReadWriteDataObjcExample_DogClub *club = [[ReadWriteDataObjcExample_DogClub alloc] init];
    club.name = @"Pooch Pals";
    [club.members addObject:owner];
    
    [realm transactionWithBlock:^() {
        [realm addObject:club];
    }];
    
    // Later, query the specific owner
    ReadWriteDataObjcExample_DogOwner *specificOwner = [ReadWriteDataObjcExample_DogOwner objectForPrimaryKey:@12345];
        
    // Access directly through an inverse relationship
    NSLog(@"# memberships: %lu", [specificOwner.clubs count]);
    NSLog(@"First club's name: %@", [specificOwner.clubs[0] name]);
    // :code-block-end:
}

@end

// :replace-end:
